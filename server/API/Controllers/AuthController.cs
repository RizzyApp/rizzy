using System.Security.Claims;
using API.Authentication;
using API.Contracts;
using API.Contracts.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;

    public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<RegistrationResponse>> Register(RegistrationRequest request)
    {
        var user = new IdentityUser { Email = request.Email, UserName = request.Email };
        var identityResult = await _userManager.CreateAsync(user, request.Password);

        if (!identityResult.Succeeded)
        {
            foreach (var error in identityResult.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return BadRequest(ModelState);
        }
        await _userManager.AddToRoleAsync(user, "User");
        await _signInManager.SignInAsync(user, isPersistent: true); 
        
        return CreatedAtAction(nameof(Register), new RegistrationResponse(user.Email));
    }
    
    [HttpPost("Login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            ModelState.AddModelError("Login", "Invalid email or password.");
            return BadRequest(ModelState);
        }

        var result = await _signInManager.PasswordSignInAsync(user, request.Password, isPersistent: true, lockoutOnFailure: false);

        if (!result.Succeeded)
        {
            ModelState.AddModelError("Login", "Invalid email or password.");
            return BadRequest(ModelState);
        }
        
        return Ok(new AuthResponse(user.Email));
    }

    [Authorize]
    [HttpPost("Logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync(); 
        return Ok(new { Message = "Logged out successfully" });
    }

    [Authorize]
    [HttpGet("IsLoggedIn")]
    public IActionResult IsLoggedIn()
    {
        return NoContent();
    }
}

