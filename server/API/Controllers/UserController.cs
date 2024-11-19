using System.Linq;
using System.Net;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Claims;
using System.Text;
using API.Contracts;
using API.Contracts.UserProfile;
using API.Data.Models;
using API.Models;
using API.Services;
using API.Utils.Exceptions;
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
    private readonly IRepository<Swipes> _swipesRepository;
    private readonly IRepository<Photo> _userPhotoRepository;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IUserService _userService;


    public UserController(IRepository<User> userRepository, IRepository<UserLocation> userLocationRepository,
        IRepository<Swipes> swipesRepository, UserManager<IdentityUser> userManager, IUserService userService,
        IRepository<Photo> userPhoto)
    {
        _userRepository = userRepository;
        _userLocationRepository = userLocationRepository;
        _swipesRepository = swipesRepository;
        _userManager = userManager;
        _userService = userService;
        _userPhotoRepository = userPhoto;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CreateProfileResponse>> PostUser(ProfileRequestDto requestDto)
    {
        if (requestDto.PreferredMinAge > requestDto.PreferredMaxAge)
        {
            return BadRequest("Preferred min age can't be bigger than preferred max age");
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
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

        await _userRepository.Add(result);

        return CreatedAtAction(nameof(PostUser),
            new CreateProfileResponse(result.Name, result.Gender, result.BirthDate, result.Bio));
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<ActionResult<UserProfileResponse>> GetUserProfile()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        var photos = _userPhotoRepository.Query().Where(p => p.UserId == loggedInUser.Id).Select(p => p.Url).ToList();
        Console.WriteLine("p count: " + photos.Count);


        //var email = loggedInUser.AspNetUser.Email;


        var userProfileResponse = new UserProfileResponse(
            loggedInUser.Name,
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


        try
        {
            await _userRepository.Update(loggedInUser);
            //await _userRepository.SaveChangesAsync();

            return Ok(new { Message = "Update successful" });
        }
        catch (Exception ex)
        {
            return StatusCode(500,
                new { Message = "An error occurred while updating the profile", Details = ex.Message });
        }
    }


    [Authorize]
    [HttpPost("Location")]
    public async Task<ActionResult> PostLocation([FromBody] LocationUpdateDto locationRequest)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        await _userLocationRepository.Add(new UserLocation
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
            return NotFound("User not found");
        }

        userUpdate.Latitude = update.Latitude;
        userUpdate.Longitude = update.Longitude;

        await _userLocationRepository.Update(userUpdate);
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
            return NotFound("Location not found");
        }


        return Ok(new
        {
            userLocation.Id,
            userLocation.UserId,
            userLocation.Latitude,
            userLocation.Longitude
        });
    }

    [Authorize]
    [HttpDelete("swipes")]
    public async Task<IActionResult> DeleteSwipes([FromServices] IHostEnvironment hostEnvironment)
    {
        if (!hostEnvironment.IsDevelopment())
        {
            return Forbid("This action is restricted to the development environment.");
        }

        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        loggedInUser = _userRepository.Query()
            .Include(u => u.Swipes)
            .FirstOrDefault(u => u.Id == loggedInUser.Id);


        await _swipesRepository.RemoveRange(loggedInUser.Swipes);

        return NoContent();
    }


    private static int GetAge(DateTime birthDate)
    {
        return DateTime.Now.Year - birthDate.Year;
    }
}