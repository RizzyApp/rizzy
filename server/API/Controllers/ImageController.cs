using System.Security.Claims;
using API.Authentication;
using API.Models;
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
    private ICloudinaryUpload _cloudinaryUpload;
    private IRepository<Photo> _photoRepository;
    private IUserService _userService;
    private IImageValidationService _imageValidationService;

    public ImageController(ILogger<ImageController> logger, ICloudinaryUpload cloudinaryUpload,
        IUserService userService, IImageValidationService imageValidationService, IRepository<Photo> photoRepository)
    {
        _logger = logger;
        _cloudinaryUpload = cloudinaryUpload;
        _userService = userService;
        _photoRepository = photoRepository;
        _imageValidationService = imageValidationService;
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

        //Console.WriteLine(userId);
        return null;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> UploadPhoto(IFormFile image)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        _logger.LogInformation("User accessed UploadPicture with userId: {userId} ", loggedInUser.Id);

        if (!_imageValidationService.IsFileSizeValid(image.Length))
        {
            return BadRequest("image exceeds maximum size"); //the frontend should provide the better description
        }

        if (!_imageValidationService.IsResolutionAndAspectRatioValid(image))
        {
            return BadRequest("image has the wrong aspect ratio or resolution exceeds maximum");
        }

        var result = await _cloudinaryUpload.Upload(image);

        var photo = new Photo
        {
            UserId = loggedInUser.Id,
            Url = result.Url.ToString()
        };

        await _photoRepository.Add(photo);

        return Created();
    }

    
}