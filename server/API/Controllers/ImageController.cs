using System.Text.Json;
using System.Text.Json.Serialization;
using API.Contracts.Photo;
using API.Services;
using API.Services.ImageUpload;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/v1/user/[controller]")]
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

    [Authorize]
    [HttpPost("changes")]
    public async Task<IActionResult> ProcessPhotoChanges([FromForm] string metadata, [FromForm] List<IFormFile> files)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        
        _logger.LogInformation("User accessed ProcessPhotoChanges with userId: {userId} ", loggedInUser!.Id);
        
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
        };
        var photoChangeMetadata = JsonSerializer.Deserialize<List<PhotoChangeMetadata>>(metadata, options);
        
        if (photoChangeMetadata == null)
        {
            return BadRequest("Invalid metadata format.");
        }
        
        await _imageService.HandleChanges(photoChangeMetadata, files, loggedInUser.Id);

        return Ok("Changes were processed");
    }
}