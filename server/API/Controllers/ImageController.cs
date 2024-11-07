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
    
    
    [HttpGet("{userId}")]
    public Task<ActionResult<Photo>> GetPhotosByUser()
    {

        return null;
    }

    [HttpGet]
    [AuthorizeWithNameId]
    public async Task<ActionResult<Photo>> GetOwnPhotos()
    {
        var userId = User.GetUserId();
       
       Console.WriteLine(userId);
        return null;
    }
    
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Photo>> UploadPhoto()
    {
        return null;
    }
    
}