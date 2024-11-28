using System.Collections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/v1/Admin")]
public class AdminController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;

    public AdminController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }
    
    //Todo Get all users
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = _userManager.Users.ToList();

        var usersWithRoles = new List<object>();

        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);
            usersWithRoles.Add(new
            {
                user.Id,
                user.Email,
                user.UserName,
                roles
            });
        }
        
        return Ok(usersWithRoles);
    }
    
    //Todo Ban
    [HttpDelete("ban-user/{userId}")]
    public async Task<IActionResult> BanUser(string userId, [FromBody] int banDuration)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound(new { Error = "User not found" });
        }

        var lockoutEndDate = DateTimeOffset.UtcNow.AddDays(banDuration);
        await _userManager.SetLockoutEndDateAsync(user, lockoutEndDate);

        return Ok(new { Message = $"User banned for {banDuration} days." });
    }
    
    
    //Todo ResetPassword
    
    //Todo Toggle role between user or vip
}