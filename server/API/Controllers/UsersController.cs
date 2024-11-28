using API.Contracts;
using API.Contracts.UserProfile;
using API.Data.Models;
using API.Data.Repositories;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IRepository<User> _userRepository;
    private readonly IMatchService _matchService;
    private readonly IUserService _userService;

    private const int MAXIMUM_LOCATION_RANGE = 100000;
    private const int MINIMUM_AGE = 18;
    private const int MAXIMUM_AGE = 150;
    private const decimal DEFAULT_LATITUDE = 47.4979m;
    private const decimal DEFAULT_LONGITUDE = 19.0402m; //Budapest
    private const int DEFAULT_PREFERRED_GENDER = 2; //Both male and female
    private const int AMOUNT_TO_FETCH = 10;

    private readonly ILogger<UsersController> _logger;

    public UsersController(IUserService userService,
        IRepository<User> userRepository, IMatchService matchService, ILogger<UsersController> logger)
    {
        _userService = userService;
        _userRepository = userRepository;
        _matchService = matchService;
        _logger = logger;
    }

    [Authorize]
    [HttpGet("matches")]
    public async Task<ActionResult<IEnumerable<MinimalProfileDataResponse>>> GetUsersForChat()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        _logger.LogInformation("Fetching matched users for user {UserId}.", loggedInUser.Id);

        var users = await _matchService.GetMatchedUsersMinimalData(loggedInUser.Id);

        if (users == null || !users.Any())
        {
            _logger.LogInformation("No matched users found for user {UserId}.", loggedInUser.Id);
        }
        else
        {
            _logger.LogInformation("{MatchedUserCount} matched users found for user {UserId}.", users.Count(),
                loggedInUser.Id);
        }

        return Ok(users);
    }

    [Authorize]
    [HttpGet("swipe-users")]
    public async Task<ActionResult<IEnumerable<UserCardDto>>> GetSwipeUsers()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        _logger.LogInformation("Fetching swipe users for user {UserId}.", loggedInUser.Id);

        loggedInUser = await _userRepository.Query()
            .Include(u => u.Swipes)
            .Include(u => u.UserLocation)
            .FirstOrDefaultAsync(u => u.Id == loggedInUser.Id);

        if (loggedInUser == null)
        {
            _logger.LogError("User {UserId} not found while fetching swipe users.", loggedInUser.Id);
            return NotFound("User not found");
        }

        var filteredUsers = await _userService.GetFilteredUsersAsync(
            loggedInUser.Id,
            loggedInUser.PreferredGender,
            loggedInUser.PreferredMinAge,
            loggedInUser.PreferredMaxAge,
            loggedInUser.UserLocation.Latitude,
            loggedInUser.UserLocation.Longitude,
            loggedInUser.PreferredLocationRange,
            AMOUNT_TO_FETCH,
            loggedInUser.Swipes?.Select(s => s.SwipedUserId)
        );

        _logger.LogInformation("Fetched {SwipeUserCount} swipe users for user {UserId}.", filteredUsers.Count(),
            loggedInUser.Id);

        return Ok(filteredUsers);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("search-users-for-swipe")]
    public async Task<ActionResult<IEnumerable<UserCardDto>>> SearchUsers(
        [FromQuery] int preferredGender = DEFAULT_PREFERRED_GENDER,
        [FromQuery] int minAge = MINIMUM_AGE,
        [FromQuery] int maxAge = MAXIMUM_AGE,
        [FromQuery] decimal latitude = DEFAULT_LATITUDE,
        [FromQuery] decimal longitude = DEFAULT_LONGITUDE,
        [FromQuery] int locationRange = MAXIMUM_LOCATION_RANGE,
        [FromQuery] int amount = AMOUNT_TO_FETCH,
        [FromQuery] IEnumerable<int>? excludedUserIds = null)
    {
        _logger.LogInformation(
            "Searching for users with preferred gender {PreferredGender}, age range {MinAge}-{MaxAge}, location ({Latitude}, {Longitude}), range {LocationRange} and excluding users {ExcludedUserIdsCount}.",
            preferredGender, minAge, maxAge, latitude, longitude, locationRange, excludedUserIds?.Count() ?? 0);

        var filteredUsers = await _userService.GetFilteredUsersAsync(
            null,
            preferredGender,
            minAge,
            maxAge,
            latitude,
            longitude,
            locationRange,
            amount,
            excludedUserIds
        );

        _logger.LogInformation("Search returned {FilteredUserCount} users.", filteredUsers.Count());

        return Ok(filteredUsers);
    }
}