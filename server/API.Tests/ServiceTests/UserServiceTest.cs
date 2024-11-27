using API.Contracts;
using API.Data;
using API.Data.Models;
using API.Data.Repositories;
using API.Services;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Tests.ServiceTests;

[TestFixture]
public class UserServiceTest
{
    private AppDbContext _dbContext;
    private IUserService _userService;
    private IRepository<User> _repository;
    private ILogger<UserService> _logger;

    [SetUp]
    public void SetUp()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .EnableSensitiveDataLogging()
            .UseInMemoryDatabase("testDatabase")
            .Options;

        _dbContext = new AppDbContext(options);
        _repository = new Repository<User>(_dbContext);
        _logger = A.Fake<ILogger<UserService>>();
        _userService = new UserService(_repository, _logger);

        SeedDatabase();
    }

    [TearDown]
    public void TearDown()
    {
        _dbContext.Database.EnsureDeleted();
        _dbContext.Dispose();
    }

    [Test]
    public async Task UserService_GetFilteredUsersAsync_preferredGenderBoth_ReturnsListThreeElements()
    {
        //Arrange
        const int userId = 4;
        const int preferredGender = 2;
        const int minAge = 18;
        const int maxAge = 70;
        const decimal latitude = 47.909036m;
        const decimal longitude = 20.370068m;
        const int locationRange = 100;
        const int amount = 10;

        //Act
        var result =  await _userService.GetFilteredUsersAsync(userId, preferredGender, minAge, maxAge, latitude, longitude,
            locationRange, amount);

        //Act
        var userCardDtos = result as UserCardDto[] ?? result.ToArray();
        userCardDtos.Should().NotBeNull(); 
        userCardDtos.Should().HaveCount(3);

        
    }

    [Test]
    public async Task UserService_GetFilteredUsersAsync_PreferredGenderOne_ReturnsListOneELements()
    {
        //Arrange
        const int userId = 4;
        const int preferredGender = 1;
        const int minAge = 18;
        const int maxAge = 70;
        const decimal latitude = 47.909036m;
        const decimal longitude = 20.370068m;
        const int locationRange = 100;
        const int amount = 10;

        //Act
        var result = await _userService.GetFilteredUsersAsync(userId, preferredGender, minAge, maxAge, latitude, longitude,
            locationRange, amount);

        //Act
        var userCardDtos = result as UserCardDto[] ?? result.ToArray();
        userCardDtos.Should().NotBeNull();
        userCardDtos.Should().HaveCount(1);

    }

    [Test]
    public async Task UserService_GetFilteredUsersAsync_LocationRangeOne_ListZeroElement()
    {
        // Arrange
        const int userId = 4;
        const int preferredGender = 2;
        const int minAge = 18;
        const int maxAge = 70;
        const decimal latitude = 47.909036m;
        const decimal longitude = 20.370068m;
        const int locationRange = 1;
        const int amount = 10;

        //Act
        var result = await _userService.GetFilteredUsersAsync(userId, preferredGender, minAge, maxAge, latitude, longitude,
            locationRange, amount);

        //Act
        var userCardDtos = result as UserCardDto[] ?? result.ToArray();
        userCardDtos.Should().NotBeNull();
        userCardDtos.Should().BeEmpty();
        userCardDtos.Should().HaveCount(0);

    }

    [Test]
    public async Task UserService_GetFilteredUsersAsync_MaxAge30_ListOneElement()
    {
        //Arrange
        const int userId = 4;
        const int preferredGender = 2;
        const int minAge = 18;
        const int maxAge = 30;
        const decimal latitude = 47.909036m;
        const decimal longitude = 20.370068m;
        const int locationRange = 100;
        const int amount = 10;

        //Act
        var result = await _userService.GetFilteredUsersAsync(userId, preferredGender, minAge, maxAge, latitude, longitude,
            locationRange, amount);

        //Act
        var userCardDtos = result as UserCardDto[] ?? result.ToArray();
        userCardDtos.Should().NotBeNull();
        userCardDtos.Should().HaveCount(1);

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