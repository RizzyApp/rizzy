using System.Security.Claims;
using System.Text;
using API.Contracts;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IRepository<User> _repository;
    private readonly UserManager<IdentityUser> _userManager;

    public UserController(ILogger<UserController> logger, IRepository<User> repository, UserManager<IdentityUser> userManager) 
    {
        _logger = logger;
        _repository = repository;
        _userManager = userManager;
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
        
        var result = new User(){Name = request.Name, Gender = request.Gender, BirthDate = request.BirthDate, Bio = request.Bio, AspNetUser = user, };

        await _repository.Add(result);
        
        return CreatedAtAction(nameof(PostUser), new CreateProfileResponse(result.Name, result.Gender, result.BirthDate, result.Bio));
    }
}