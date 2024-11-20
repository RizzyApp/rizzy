using API.Contracts;
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
    private readonly IRepository<UserLocation> _userLocationRepository;
    private readonly IUserService _userService;

    private const int MAXIMUM_LOCATION_RANGE = 100000;
    private const int MINIMUM_AGE = 18;
    private const int MAXIMUM_AGE = 150;
    private const decimal DEFAULT_LATITUDE = 47.4979m;
    private const decimal DEFAULT_LONGITUDE = 19.0402m; //Budapest
    private const int DEFAULT_PREFERRED_GENDER = 2; //Both male and female
    private const int AMOUNT_TO_FETCH = 10;
    


    public UsersController(IUserService userService, IRepository<UserLocation> userLocationRepository,
        IRepository<User> userRepository)
    {
        _userService = userService;
        _userLocationRepository = userLocationRepository;
        _userRepository = userRepository;
    }

    [Authorize]
    [HttpGet("swipe-users")]
    public async Task<ActionResult<IEnumerable<UserCardDto>>> GetSwipeUsers()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        loggedInUser = await _userRepository.Query()
            .Include(u => u.Swipes)
            .Include(u => u.UserLocation)
            .FirstOrDefaultAsync(u => u.Id == loggedInUser.Id);
        

        var filteredUsers = await _userService.GetFilteredUsersAsync(
            loggedInUser!.Id,
            loggedInUser.PreferredGender,
            loggedInUser.PreferredMinAge,
            loggedInUser.PreferredMaxAge,
            loggedInUser.UserLocation.Latitude,
            loggedInUser.UserLocation.Longitude,
            loggedInUser.PreferredLocationRange,
            AMOUNT_TO_FETCH,
            loggedInUser.Swipes?.Select(s => s.SwipedUserId)
        );

        return Ok(filteredUsers);
    }
    
    //TODO: Don'T forget to uncomment this part!
    //[Authorize(Roles = "Admin")]
    [HttpGet("search-users-for-swipe")]
    public async Task<ActionResult<IEnumerable<UserCardDto>>> SearchUsers(
        [FromQuery] int? preferredGender = DEFAULT_PREFERRED_GENDER,
        [FromQuery] int minAge = MINIMUM_AGE,
        [FromQuery] int maxAge = MAXIMUM_AGE,
        [FromQuery] decimal latitude = DEFAULT_LATITUDE,
        [FromQuery] decimal longitude = DEFAULT_LONGITUDE,
        [FromQuery] int locationRange = MAXIMUM_LOCATION_RANGE,
        [FromQuery] int amount = AMOUNT_TO_FETCH,
        [FromQuery] IEnumerable<int>? excludedUserIds = null)
    {
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

        return Ok(filteredUsers);
    }
    
    
}