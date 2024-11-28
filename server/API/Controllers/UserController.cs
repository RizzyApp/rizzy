using System.Security.Claims;
using API.Contracts;
using API.Contracts.Photo;
using API.Contracts.UserProfile;
using API.Data.Models;
using API.Data.Repositories;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class UserController : ControllerBase
{
    private readonly IRepository<User> _userRepository;
    private readonly IRepository<UserLocation> _userLocationRepository;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IUserService _userService;
    private readonly ILogger<UserController> _logger;

    public UserController(IRepository<User> userRepository, IRepository<UserLocation> userLocationRepository,
        UserManager<IdentityUser> userManager, IUserService userService,
        ILogger<UserController> logger)
    {
        _userRepository = userRepository;
        _userLocationRepository = userLocationRepository;
        _userManager = userManager;
        _userService = userService;
        _logger = logger;
    }

    [Authorize]
    [HttpPost("profile")]
    public async Task<ActionResult<CreateProfileResponse>> PostUser(ProfileRequestDto requestDto)
    {
        if (requestDto.PreferredMinAge > requestDto.PreferredMaxAge)
        {
            _logger.LogWarning("Preferred min age can't be bigger than preferred max age. Min: {Min}, Max: {Max}",
                requestDto.PreferredMinAge, requestDto.PreferredMaxAge);
            return BadRequest("Preferred min age can't be bigger than preferred max age");
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            _logger.LogWarning("Unauthorized access attempt: User ID is null.");
            return Unauthorized();
        }

        var user = await _userManager.FindByIdAsync(userId);

        var result = new User()
        {
            Name = requestDto.Name, Gender = requestDto.Gender, BirthDate = requestDto.BirthDate, Bio = requestDto.Bio,
            Interests = requestDto.Interests, PreferredMinAge = requestDto.PreferredMinAge,
            PreferredMaxAge = requestDto.PreferredMaxAge, PreferredLocationRange = requestDto.PreferredLocationRange,
            PreferredGender = requestDto.PreferredGender, AspNetUser = user, CreatedAt = DateTime.Now,
            LastActivityDate = DateTime.Now
        };

        await _userRepository.AddAsync(result);

        _logger.LogInformation("User profile created for {UserId}: {Name}, {Gender}, {Age} years old",
            userId, result.Name, result.Gender, GetAge(result.BirthDate));

        return CreatedAtAction(nameof(PostUser),
            new CreateProfileResponse(result.Name, result.Gender, result.BirthDate, result.Bio));
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<ActionResult<UserProfileResponse>> GetUserProfile()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        _logger.LogInformation("Fetched user profile for {UserId}.", loggedInUser.Id);

        loggedInUser = _userRepository.Query()
            .Include(u => u.Photos)
            .FirstOrDefault(u => u.Id == loggedInUser.Id);

        var photos = loggedInUser.Photos
            .Select(p => new PhotoDto(p.Id, p.Url))
            .ToList();

        var userProfileResponse = new UserProfileResponse(
            loggedInUser.Name,
            User.FindFirstValue(ClaimTypes.Email)!,
            loggedInUser.Gender,
            GetAge(loggedInUser.BirthDate),
            loggedInUser.BirthDate,
            loggedInUser.Bio,
            loggedInUser.Verified,
            loggedInUser.Interests ?? Array.Empty<string>(),
            loggedInUser.PreferredMinAge,
            loggedInUser.PreferredMaxAge,
            loggedInUser.PreferredLocationRange,
            loggedInUser.PreferredGender,
            photos
        );

        return Ok(userProfileResponse);
    }

    [Authorize]
    [HttpPut("profile")]
    public async Task<ActionResult<UserProfileResponse>> UpdateUserProfile([FromBody] ProfileRequestDto requestDto)
    {
        if (requestDto.PreferredMinAge > requestDto.PreferredMaxAge)
        {
            _logger.LogWarning(
                "Update failed: Preferred min age can't be bigger than preferred max age. Min: {Min}, Max: {Max}",
                requestDto.PreferredMinAge, requestDto.PreferredMaxAge);
            return BadRequest("Preferred min age can't be bigger than preferred max age");
        }

        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        loggedInUser.Name = requestDto.Name;
        loggedInUser.Bio = requestDto.Bio;
        loggedInUser.Interests = requestDto.Interests;
        loggedInUser.PreferredMinAge = requestDto.PreferredMinAge;
        loggedInUser.PreferredMaxAge = requestDto.PreferredMaxAge;
        loggedInUser.PreferredLocationRange = requestDto.PreferredLocationRange;
        loggedInUser.PreferredGender = requestDto.PreferredGender;


        await _userRepository.UpdateAsync(loggedInUser);
        _logger.LogInformation("Profile updated for UserId {UserId}: {Name}, {Gender}, {Age} years old.",
            loggedInUser.Id, loggedInUser.Name, loggedInUser.Gender, GetAge(loggedInUser.BirthDate));

        return Ok(new { Message = "Update successful" });
    }

    [Authorize]
    [HttpPost("Location")]
    public async Task<ActionResult> PostLocation([FromBody] LocationUpdateDto locationRequest)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        _logger.LogInformation("Updating location for UserId {UserId} to Latitude: {Latitude}, Longitude: {Longitude}.",
            loggedInUser.Id, locationRequest.Latitude, locationRequest.Longitude);

        await _userLocationRepository.AddAsync(new UserLocation
        {
            UserId = loggedInUser.Id,
            Latitude = locationRequest.Latitude,
            Longitude = locationRequest.Longitude,
        });

        return Created();
    }

    [Authorize]
    [HttpPut("Location")]
    public async Task<ActionResult> UpdateLocation([FromBody] LocationUpdateDto update)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        var userUpdate = await _userLocationRepository.Query().FirstOrDefaultAsync(u => u.UserId == loggedInUser.Id);

        if (userUpdate == null)
        {
            _logger.LogWarning("User location not found for UserId {UserId}.", loggedInUser.Id);
            return NotFound("User not found");
        }

        userUpdate.Latitude = update.Latitude;
        userUpdate.Longitude = update.Longitude;

        await _userLocationRepository.UpdateAsync(userUpdate);

        _logger.LogInformation("Updated location for UserId {UserId} to Latitude: {Latitude}, Longitude: {Longitude}.",
            loggedInUser.Id, userUpdate.Latitude, userUpdate.Longitude);

        return Ok();
    }

    [Authorize]
    [HttpGet("Location")]
    public async Task<ActionResult<UserLocation>> GetLocation()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        var userLocation = await _userLocationRepository.Query().FirstOrDefaultAsync(u => u.UserId == loggedInUser.Id);

        if (userLocation == null)
        {
            _logger.LogWarning("Location not found for UserId {UserId}.", loggedInUser.Id);
            return NotFound("Location not found");
        }

        _logger.LogInformation("Fetched location for UserId {UserId}: Latitude: {Latitude}, Longitude: {Longitude}.",
            loggedInUser.Id, userLocation.Latitude, userLocation.Longitude);

        return Ok(new
        {
            userLocation.Id,
            userLocation.UserId,
            userLocation.Latitude,
            userLocation.Longitude
        });
    }

    private static int GetAge(DateTime birthDate)
    {
        return DateTime.Now.Year - birthDate.Year;
    }
}