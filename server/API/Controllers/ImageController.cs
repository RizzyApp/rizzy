using System.Security.Claims;
using API.Authentication;
using API.Models;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ImageController : ControllerBase
{
    private ILogger<ImageController> _logger;
    private ICloudinaryUpload _cloudinaryUpload;
    private IRepository<Photo> _photoRepository;
    private IUserService _userService;

    public ImageController(ILogger<ImageController> logger, ICloudinaryUpload cloudinaryUpload, IUserService userService)
    {
        _logger = logger;
        _cloudinaryUpload = cloudinaryUpload;
        _userService = userService;
    }


    [HttpGet("{userId}")]
    public Task<ActionResult<Photo>> GetPhotosByUser()
    {
        return null;
    }

    [HttpGet]
    [AuthorizeWithUserId]
    public async Task<ActionResult<Photo>> GetOwnPhotos()
    {
        var userId = User.GetUserId();

        Console.WriteLine(userId);
        return null;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> UploadPhoto(IFormFile file)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        List<string> validExtensions = new List<string>() { ".jpg", ".png" }; //TODO: Add it to appsettings or as an constant
        _logger.LogInformation("User accessed UploadPicture with userId: {userId} ", loggedInUser.Id);
        
        var extension = Path.GetExtension(file.FileName);

        if (!validExtensions.Contains(extension))
        {
            return BadRequest($"{extension} is not a valid image extension");
        }

        var size = file.Length;

        if (size > (5 * 1024 * 1024)) //TODO: add it to appsettings or as a constant
        {
            return BadRequest($"Maximum file size is 5Mb, file size was {file.Length}");
        }
        
        Console.WriteLine(extension);

        var result = await _cloudinaryUpload.Upload(file);

        var photo = new Photo
        {
            UserId = loggedInUser.Id,
            Url = result.Url.ToString()
        };

        await _photoRepository.Add(photo);

        return Created();
    }

    
}