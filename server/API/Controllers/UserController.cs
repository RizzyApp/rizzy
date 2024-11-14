using System.Linq;
using System.Net;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Claims;
using System.Text;
using API.Contracts;
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
    private readonly IRepository<Photo> _userPhotoRepository;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IUserService _userService;


    public UserController(IRepository<User> userRepository, IRepository<UserLocation> userLocationRepository, UserManager<IdentityUser> userManager, IUserService userService, IRepository<Photo> userPhoto) 
    {
        _userRepository = userRepository;
        _userLocationRepository = userLocationRepository;
        _userManager = userManager;
        _userService = userService;
        _userPhotoRepository = userPhoto;
    }
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CreateProfileResponse>> PostUser(CreateProfileRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (userId == null)
        {
            return Unauthorized();
        }

        var user = await _userManager.FindByIdAsync(userId);
        
        var result = new User(){Name = request.Name, Gender = request.Gender, BirthDate = request.BirthDate, Bio = request.Bio, Interests = request.Interests, PreferredMinAge = request.PreferredMinAge, PreferredMaxAge = request.PreferredMaxAge, PreferredLocationRange = request.PreferredLocationRange, PreferredGender = request.PreferredGender, AspNetUser = user, CreatedAt = DateTime.Now, LastActivityDate = DateTime.Now};

        await _userRepository.Add(result);
        
        return CreatedAtAction(nameof(PostUser), new CreateProfileResponse(result.Name, result.Gender, result.BirthDate, result.Bio));
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
    public async Task<ActionResult<UserProfileResponse>> UpdateUserProfile([FromBody] UpdateUserProfileRequest request)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        
        loggedInUser.Name = request.Name;
        loggedInUser.Bio = request.Bio;
        loggedInUser.Interests = request.Interests;
        loggedInUser.PreferredMinAge = request.PreferredMinAge;
        loggedInUser.PreferredMaxAge = request.PreferredMaxAge;
        loggedInUser.PreferredLocationRange = request.PreferredLocationRange;
        loggedInUser.PreferredGender = request.PreferredGender;
    
        
        try
        {
            await _userRepository.Update(loggedInUser);
            //await _userRepository.SaveChangesAsync();
        
            return Ok(new { Message = "Update successful" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "An error occurred while updating the profile", Details = ex.Message });
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
    [HttpGet("Location")]
    public async Task<ActionResult<UserLocation>> GetLocation()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        var userLocation = await _userLocationRepository.Query().FirstOrDefaultAsync(u => u.UserId == loggedInUser.Id);

        if (userLocation == null)
        {
            return NotFound("Location not found");
        }
        Console.WriteLine(GetDistance(47.80m, 20.57m, 47.74m, 20.39m));

        return Ok(new
        {
            userLocation.Id,
            userLocation.UserId,
            userLocation.Latitude,
            userLocation.Longitude
        });
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserCardDto>>> GetSwipeUsers()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        var userLocation = await _userLocationRepository.Query().FirstOrDefaultAsync(u => u.UserId == loggedInUser.Id);

        var userPreferredMinAge = loggedInUser.PreferredMinAge;
        var userPreferredMaxAge  = loggedInUser.PreferredMaxAge;
        var userPreferredLocationRange = loggedInUser.PreferredLocationRange;
        var userLatitude = userLocation!.Latitude;
        var userLongitude = userLocation.Longitude;
        var userPreferredGender = loggedInUser.PreferredGender;


        const double kmToDegrees = 0.009;

        var minLat = userLatitude - (decimal)(userPreferredLocationRange * kmToDegrees);
        var maxLat = userLatitude + (decimal)(userPreferredLocationRange * kmToDegrees);
        var minLon = userLongitude - (decimal)(userPreferredLocationRange * kmToDegrees);
        var maxLon = userLongitude + (decimal)(userPreferredLocationRange * kmToDegrees);



        var users = await _userRepository.Query()
            .Include(u =>u.Photos)
            .Include(u => u.UserLocation)
            .Where(u => u.Id != loggedInUser.Id)
            .Where(u => u.Gender == userPreferredGender)
            .Where(u => u.UserLocation.Latitude >= minLat && u.UserLocation.Latitude <= maxLat)
            .Where(u => u.UserLocation.Longitude >= minLon && u.UserLocation.Longitude <= maxLon)
            .ToListAsync();

        var filteredUsers = users
            .Where(u => GetAge(u.BirthDate) >= userPreferredMinAge && GetAge(u.BirthDate) <= userPreferredMaxAge)
            .Where(u => GetDistance(userLatitude, userLongitude, u.UserLocation.Latitude, u.UserLocation.Longitude) <= userPreferredLocationRange)
            .Select(u => new UserCardDto(
                u.Id,
                u.Name,
                GetAge(u.BirthDate),
                u.Bio,
                (int)GetDistance(userLatitude, userLongitude, u.UserLocation.Latitude, u.UserLocation.Longitude),
                u.Photos.Select(p => p.Url)
            ));

        return Ok(filteredUsers);
    }

    private static int GetAge(DateTime birthDate)
    {
        return DateTime.Now.Year - birthDate.Year;
    }

    private static double GetDistance(decimal latitude1, decimal longitude1, decimal latitude2, decimal longitude2)
    {
        const double earthRadiusKm = 6371.0;

        var lat1 = (double)latitude1 * Math.PI / 180.0;
        var lon1 = (double)longitude1 * Math.PI / 180.0;
        var lat2 = (double)latitude2 * Math.PI / 180.0;
        var lon2 = (double)longitude2 * Math.PI / 180.0;

        var dlat = lat2 - lat1;
        var dlon = lon2 - lon1;

        var a = Math.Sin(dlat / 2) * Math.Sin(dlat / 2) +
                   Math.Cos(lat1) * Math.Cos(lat2) *
                   Math.Sin(dlon / 2) * Math.Sin(dlon / 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

        return earthRadiusKm * c;

    }


    //[FromQuery]
    //decimal longitude,
    //[FromQuery] decimal latitude, [FromQuery] double preferredDistance, [FromQuery] int preferredMinAge, [FromQuery] int preferredMaxAge, [FromQuery] int preferredGender
}