using API.Contracts;
using API.Data;
using API.Data.Models;
using API.Data.Repositories;
using API.Hubs;
using API.Services;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Tests.ServiceTests;

[TestFixture]
public class MatchServiceTests
{
    private AppDbContext _dbContext;
    private IRepository<Swipes> _swipeRepository;
    private IRepository<MatchInfo> _matchRepository;
    private IRepository<Photo> _photoRepository;
    private IRepository<User> _userRepository;
    private ILogger<BaseHub<INotificationHubClient>> _logger;
    private IHubContext<NotificationHub, INotificationHubClient> _hubContext;
    private MatchService _matchService;

    [SetUp]
    public void SetUp()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .EnableSensitiveDataLogging()
            .UseInMemoryDatabase("testDatabase")
            .Options;

        _dbContext = new AppDbContext(options);
        _swipeRepository = new Repository<Swipes>(_dbContext);
        _matchRepository = new Repository<MatchInfo>(_dbContext);
        _photoRepository = new Repository<Photo>(_dbContext);
        _userRepository = new Repository<User>(_dbContext);
        _logger = A.Fake<ILogger<BaseHub<INotificationHubClient>>>();
        new NotificationHub(_logger);
        _hubContext = A.Fake<IHubContext<NotificationHub, INotificationHubClient>>();
        _matchService = new MatchService(_matchRepository, _swipeRepository, _hubContext, _photoRepository,
            _userRepository);

        SeedDatabase();
    }

    [TearDown]
    public void TearDown()
    {
        _dbContext.Database.EnsureDeleted();
        _dbContext.Dispose();
    }

    [Test]
    public async Task MatchService_CreateMatchIfMutual_CreatesMatch()
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


        var result = await _matchService.CreateMatchIfMutualAsync(loggedInUser, swipedUser);

        

        result.Should().NotBeNull();
        _dbContext.MatchInfos.Count().Should().Be(1);
    }

    [Test]
    public async Task MatchService_CreateMatchIfMutual_ReturnsNull()
    {
        var loggedInUser = _dbContext.Users.First(u => u.Id == 1);
        var swipedUser = _dbContext.Users.First(u => u.Id == 2);

        _dbContext.Swipes.Add(new Swipes
        {
            UserId = loggedInUser.Id,
            SwipedUserId = swipedUser.Id,
            SwipeType = "left"
        });
        await _dbContext.SaveChangesAsync();
        _dbContext.Swipes.Add(new Swipes
        {
            UserId = swipedUser.Id,
            SwipedUserId = loggedInUser.Id,
            SwipeType = "left"
        });
        await _dbContext.SaveChangesAsync();


        var result = await _matchService.CreateMatchIfMutualAsync(loggedInUser, swipedUser);



        result.Should().BeNull();
        _dbContext.MatchInfos.Count().Should().Be(0);
    }

    [Test]
    public async Task MatchService_GetMatchedUsersMinimalData_ReturnsListOfUsers()
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
        var userDataResult = await _matchService.GetMatchedUsersMinimalData(1);

        userDataResult.Should().NotBeNull();
        userDataResult.Count().Should().Be(1, "Connected to only one user");
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