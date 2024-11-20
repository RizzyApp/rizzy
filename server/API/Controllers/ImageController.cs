using System.Security.Claims;
using API.Authentication;
using API.Data.Models;
using API.Data.Repositories;
using API.Services;
using API.Services.ImageUpload;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ImageController : ControllerBase
{
    private ILogger<ImageController> _logger;
    private IUserService _userService;
    private readonly IImageService _imageService;

    public ImageController(ILogger<ImageController> logger,
        IUserService userService, IImageService imageService)
    {
        _logger = logger;
        _userService = userService;
        _imageService = imageService;
    }
    

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> UploadPhoto(IFormFile image)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        _logger.LogInformation("User accessed UploadPicture with userId: {userId} ", loggedInUser.Id);

        await _imageService.ValidateAndUpload(image, loggedInUser.Id);

        return Created();
    }

    
}