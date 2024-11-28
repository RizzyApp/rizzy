using System.Collections;
using API.Services.Authentication;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/v1/Admin")]
public class AdminController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private IOptions<RoleSettings> _roleSetting;

    public AdminController(UserManager<IdentityUser> userManager, IOptions<RoleSettings> roleSetting)
    {
        _userManager = userManager;
        _roleSetting = roleSetting;
    }
    
    //Todo Get all users
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = _userManager.Users.ToList();

        var usersAllData = new List<object>();

        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var userBanInfo = await _userManager.GetLockoutEndDateAsync(user);
            var isBanned = userBanInfo.HasValue && userBanInfo.Value > DateTimeOffset.UtcNow;
            usersAllData.Add(new
            {
                user.Id,
                user.Email,
                user.UserName,
                roles,
                isBanned,
                userBanInfo
            });
        }
        
        return Ok(usersAllData);
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
    
    //Todo UnBan
    [HttpPost("unban-user/{userId}")]
    public async Task<IActionResult> UnbanUser(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound(new { Error = "User not found" });
        }

        await _userManager.SetLockoutEndDateAsync(user, null);

        return Ok(new { Message = "User unbanned successfully." });
    }
    
    //Todo ResetPassword
    [HttpPost("reset-password/{userId}")]
    public async Task<IActionResult> ResetPassword(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound(new
            {
                Error = "User not found"
            });
        }

        string basicPassword = "basicPassword123";
        await _userManager.RemovePasswordAsync(user);
        var result = await _userManager.AddPasswordAsync(user, basicPassword);

        if (!result.Succeeded)
        {
            return BadRequest(new { Error = result.Errors });
        }

        return Ok(new { Message = "Password reset successfully.", basicPassword });
    }
    
    //Todo Toggle role between user or vip
    [HttpPost("toggle-role/{userId}")]
    public async Task<IActionResult> ToggleRole(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound(new { Error = "User not found" });
        }

        var isVip = await _userManager.IsInRoleAsync(user, _roleSetting.Value.VIP);
        if (isVip)
        {
            await _userManager.RemoveFromRoleAsync(user, _roleSetting.Value.VIP);
            await _userManager.AddToRoleAsync(user, _roleSetting.Value.User);
        }
        else
        {
            await _userManager.RemoveFromRoleAsync(user, _roleSetting.Value.User);
            await _userManager.AddToRoleAsync(user, _roleSetting.Value.VIP);
        }

        return Ok(new { Message = "User role toggled successfully." });
    }
    
}   