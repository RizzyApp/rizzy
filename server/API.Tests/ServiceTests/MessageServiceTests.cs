using API.Contracts.Messages;
using API.Data;
using API.Data.Models;
using API.Data.Repositories;
using API.Hubs;
using API.Services;
using API.Utils.Exceptions;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Tests.ServiceTests;

[TestFixture]
public class MessageServiceTests
{
    private AppDbContext _dbContext;
    private IRepository<MatchInfo> _matchRepository;
    private IRepository<Message> _messageRepository;
    private IHubContext<ChatHub, IChatHubClient> _chatHubContext;
    private IHubContext<NotificationHub, INotificationHubClient> _notificationHubContext;
    private MessageService _messageService;
    private MatchService _matchService;
    private IRepository<Swipes> _swipeRepository;
    private IHubContext<NotificationHub, INotificationHubClient> _hubContext;
    private IRepository<Photo> _photoRepository;
    private IRepository<User> _userRepository;

    [SetUp]
    public void SetUp()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .EnableSensitiveDataLogging()
            .UseInMemoryDatabase("testDatabase")
            .Options;

        _dbContext = new AppDbContext(options);
        _matchRepository = new Repository<MatchInfo>(_dbContext);
        _messageRepository = new Repository<Message>(_dbContext);
        _chatHubContext = A.Fake<IHubContext<ChatHub, IChatHubClient>>();
        _notificationHubContext = A.Fake<IHubContext<NotificationHub, INotificationHubClient>>();
        _messageService =
            new MessageService(_matchRepository, _chatHubContext, _notificationHubContext, _messageRepository);

        _swipeRepository = new Repository<Swipes>(_dbContext);
        _hubContext = A.Fake<IHubContext<NotificationHub, INotificationHubClient>>();
        _photoRepository = new Repository<Photo>(_dbContext);
        _userRepository = new Repository<User>(_dbContext);

        _matchService = new MatchService(_matchRepository, _swipeRepository, _hubContext, _photoRepository,
            _userRepository);

        SeedDatabase();
        CreateMatch();
    }

    [TearDown]
    public void TearDown()
    {
        _dbContext.Database.EnsureDeleted();
        _dbContext.Dispose();
    }

    [Test]
    public async Task MessageService_SendMessageToUser_ReturnsMessageResponse()
    {
        const int senderUserId = 1;
        var messageRequest = new SendMessageRequest
        {
            Content = "Hello There!",
            ReceiverId = 2,
            TimeStamp = DateTime.Now
        };

        var response = await _messageService.SendMessageToUser(senderUserId, messageRequest);

        response.Should().NotBeNull();
        response.Content.Should().Be("Hello There!");
        response.SenderId.Should().Be(1);
        response.ReceiverId.Should().Be(2);
    }

    [Test]
    public async Task MessageService_SendMessageToUser_NoMatchInfo_ThrowsException()
    {
        const int senderUserId = 3;
        var messageRequest = new SendMessageRequest
        {
            Content = "Hello There!",
            ReceiverId = 2,
            TimeStamp = DateTime.Now
        };

        Func<Task> act = async () => await _messageService.SendMessageToUser(senderUserId, messageRequest);

        await act.Should().ThrowAsync<BadRequestException>();
    }

    [Test]
    public async Task MatchService_GetMessagesBySender()
    {
        var msg1 = new SendMessageRequest
        {
            Content = "Hello There!",
            ReceiverId = 2,
            TimeStamp = DateTime.Now
        };
        var msg2 = new SendMessageRequest
        {
            Content = "General Kenobi!",
            ReceiverId = 1,
            TimeStamp = DateTime.Now
        };

        await _messageService.SendMessageToUser(1, msg1);
        await _messageService.SendMessageToUser(2, msg2);

        var result = await _messageService.GetMessagesBySender(1);

        result.Data.Should().ContainKey(2);

        var messages = result.Data[2];

        result.Should().NotBeNull();
        result.Data.Count.Should().Be(1);
        messages[0].Content.Should().Be("Hello There!");
        messages[1].Content.Should().Be("General Kenobi!");
    }

    private async void CreateMatch()
    {
        var loggedInUser = _dbContext.Users.First(u => u.Id == 1);
        var swipedUser = _dbContext.Users.First(u => u.Id == 2);

        _dbContext.Swipes.Add(new Swipes
        {
            UserId = loggedInUser.Id,
            SwipedUserId = swipedUser.Id,
            SwipeType = "right"
        });
        await _dbContext.SaveChangesAsync();
        _dbContext.Swipes.Add(new Swipes
        {
            UserId = swipedUser.Id,
            SwipedUserId = loggedInUser.Id,
            SwipeType = "right"
        });
        await _dbContext.SaveChangesAsync();

        await _matchService.CreateMatchIfMutualAsync(loggedInUser, swipedUser);
    }

    private void SeedDatabase()
    {
        var user1 = new User
        {
            Id = 1,
            AspNetUserId = "user1-identity",
            AspNetUser = new IdentityUser { Id = "user1-identity", UserName = "User1" },
            Name = "User One",
            Gender = 0,
            BirthDate = new DateTime(1990, 1, 1),
            Bio = "Sample bio for User One",
            Verified = true,
            CreatedAt = DateTime.UtcNow,
            LastActivityDate = DateTime.UtcNow.AddMinutes(-30),
            Interests = new[] { "Music", "Travel" },
            PreferredMinAge = 25,
            PreferredMaxAge = 35,
            PreferredLocationRange = 50,
            PreferredGender = 1,
            Photos = new List<Photo>(),
            UserLocation = new UserLocation
            {
                Id = 1,
                Longitude = 20.383810m,
                Latitude = 47.894996m,
            }
        };

        var user2 = new User
        {
            Id = 2,
            AspNetUserId = "user2-identity",
            AspNetUser = new IdentityUser { Id = "user2-identity", UserName = "User2" },
            Name = "User Two",
            Gender = 1,
            BirthDate = new DateTime(1995, 6, 15),
            Bio = "Sample bio for User Two",
            Verified = true,
            CreatedAt = DateTime.UtcNow,
            LastActivityDate = DateTime.UtcNow.AddMinutes(-15),
            Interests = new[] { "Books", "Hiking" },
            PreferredMinAge = 28,
            PreferredMaxAge = 40,
            PreferredLocationRange = 30,
            PreferredGender = 0,
            Photos = new List<Photo>(),
            UserLocation = new UserLocation
            {
                Id = 2,
                Longitude = 20.380718m,
                Latitude = 47.883485m,
            }
        };

        var user3 = new User
        {
            Id = 3,
            AspNetUserId = "user2-identity",
            AspNetUser = new IdentityUser { Id = "user3-identity", UserName = "User2" },
            Name = "User Two",
            Gender = 0,
            BirthDate = new DateTime(1992, 6, 15),
            Bio = "Sample bio for User Two",
            Verified = true,
            CreatedAt = DateTime.UtcNow,
            LastActivityDate = DateTime.UtcNow.AddMinutes(-15),
            Interests = new[] { "Books", "Hiking" },
            PreferredMinAge = 28,
            PreferredMaxAge = 40,
            PreferredLocationRange = 30,
            PreferredGender = 2,
            Photos = new List<Photo>(),
            UserLocation = new UserLocation
            {
                Id = 3,
                Longitude = 20.419539m,
                Latitude = 47.874504m,
            }
        };


        _dbContext.Users.AddRange(user1, user2, user3);
        _dbContext.SaveChanges();
    }
}