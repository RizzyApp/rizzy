using System.Runtime.InteropServices.JavaScript;
using System.Security.Claims;
using System.Text;
using API.Contracts;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class UserController : ControllerBase
{
    private readonly IRepository<User> _repository;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IUserService _userService;


    public UserController(IRepository<User> repository, UserManager<IdentityUser> userManager, IUserService userService) 
    {
        _repository = repository;
        _userManager = userManager;
        _userService = userService;
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

        await _repository.Add(result);
        
        return CreatedAtAction(nameof(PostUser), new CreateProfileResponse(result.Name, result.Gender, result.BirthDate, result.Bio));
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserCardDto>>> GetSwipeUsers([FromQuery] decimal longitude,
        [FromQuery] decimal latitude, [FromQuery] double preferredDistance, [FromQuery] int preferredMinAge, [FromQuery] int preferredMaxAge, [FromQuery] int preferredGender)
    {
        

        return Ok();
    }

    private static double GetDistance(double latitude1, double longitude1, double latitude2, double longitude2)
    {
        const double earthRadiusKm = 6371.0;

        var lat1 = latitude1 * Math.PI / 180.0;
        var lon1 = longitude1 * Math.PI / 180.0;
        var lat2 = latitude2 * Math.PI / 180.0;
        var lon2 = longitude2 * Math.PI / 180.0;

        var dlat = lat2 - lat1;
        var dlon = lon2 - lon1;

        var a = Math.Sin(dlat / 2) * Math.Sin(dlat / 2) +
                   Math.Cos(lat1) * Math.Cos(lat2) *
                   Math.Sin(dlon / 2) * Math.Sin(dlon / 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

        return earthRadiusKm * c;

    }
}