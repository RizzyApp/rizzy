using System.Security.Claims;
using API.Contracts.Auth;
using API.Data.Models;
using API.Services;
using CloudinaryDotNet.Actions;
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
    private readonly IUserService _userService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        SignInManager<IdentityUser> signInManager,
        UserManager<IdentityUser> userManager,
        IUserService userService,
        ILogger<AuthController> logger)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _userService = userService;
        _logger = logger;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<RegistrationResponse>> Register(RegistrationRequest request)
    {
        _logger.LogInformation("Registering new user with email: {Email}", request.Email);

        var user = new IdentityUser { Email = request.Email, UserName = request.Email };
        var identityResult = await _userManager.CreateAsync(user, request.Password);

        if (!identityResult.Succeeded)
        {
            foreach (var error in identityResult.Errors)
            {
                if (error.Code != "DuplicateUserName")
                {
                    ModelState.AddModelError(error.Code, error.Description);
                    _logger.LogWarning("Registration failed for {Email}: {Error}", request.Email, error.Description);
                }
            }
            return BadRequest(ModelState);
        }

        await _userManager.AddToRoleAsync(user, "User");
        await _signInManager.SignInAsync(user, isPersistent: true);

        _logger.LogInformation("User registered and signed in: {Email}", user.Email);

        return CreatedAtAction(nameof(Register), new RegistrationResponse(user.Email));
    }

    [HttpPost("Login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        _logger.LogInformation("User login attempt: {Email}", request.Email);

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            _logger.LogWarning("Login failed: User with email {Email} not found.", request.Email);
            ModelState.AddModelError("Login", "Invalid email or password.");
            return BadRequest(ModelState);
        }

        var result = await _signInManager.PasswordSignInAsync(user, request.Password, isPersistent: true, lockoutOnFailure: false);

        if (!result.Succeeded)
        {
            _logger.LogWarning("Login failed for {Email}: Invalid credentials.", request.Email);
            ModelState.AddModelError("Login", "Invalid email or password.");
            return BadRequest(ModelState);
        }

        _logger.LogInformation("User logged in successfully: {Email}", user.Email);

        var roles = await _userManager.GetRolesAsync(user);
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        return Ok(new AuthResponse(
            user.Email,
            loggedInUser?.Id ?? 0,
            loggedInUser?.Name ?? user.UserName,
            roles));
    }

    [Authorize]
    [HttpPost("Logout")]
    public async Task<IActionResult> Logout()
    {
        var userEmail = User.FindFirstValue(ClaimTypes.Email);
        _logger.LogInformation("User logging out: {Email}", userEmail);

        await _signInManager.SignOutAsync();

        _logger.LogInformation("User logged out: {Email}", userEmail);
        return Ok(new { Message = "Logged out successfully" });
    }

    [Authorize]
    [HttpGet("logged-in-user")]
    public async Task<ActionResult<AuthResponse>> GetAuthStatus()
    {
        var identityUser = await _userManager.GetUserAsync(User);
        if (identityUser == null)
        {
            _logger.LogWarning("GetAuthStatus failed: User not found.");
            return Unauthorized(new { Error = "User not found." });
        }

        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        var roles = await _userManager.GetRolesAsync(identityUser);

        _logger.LogInformation("Fetched logged-in user details for: {Email}", identityUser.Email);

        return Ok(new AuthResponse(
            Email: User.FindFirst(ClaimTypes.Email)?.Value,
            UserId: loggedInUser?.Id ?? 0,
            Name: loggedInUser?.Name ?? identityUser.UserName,
            Roles: roles));
    }

    [Authorize]
    [HttpGet("roles")]
    public async Task<ActionResult<object>> GetUserRoles()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            _logger.LogWarning("GetUserRoles failed: User not found.");
            return Unauthorized(new { Error = "User not found." });
        }

        var roles = await _userManager.GetRolesAsync(user);

        _logger.LogInformation("Fetched roles for user: {Email}", user.Email);

        return Ok(new { Email = user.Email, Roles = roles });
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<ActionResult> ChangePassword( [FromBody] ChangePasswordRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized(new { Error = "User not found!" });
        }
     
        var userWithNewPassword = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
        if (!userWithNewPassword.Succeeded)
        {
            return BadRequest(new { Error = "Failed to change password!" });
        }
        
        return Ok(new { Message = "Password is changed successfully." });
    }
}