using API.Contracts;
using API.Data.Models;
using API.Data.Repositories;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class SwipeController : ControllerBase
{
    private readonly IRepository<Swipes> _swipeRepository;
    private readonly IRepository<User> _userRepository;
    private readonly IUserService _userService;

    public SwipeController(IRepository<Swipes> swipeRepository, IRepository<User> userRepository, IUserService userService)
    {
        _swipeRepository = swipeRepository;
        _userRepository = userRepository;
        _userService = userService;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Swipes>>> GetSwipes()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        var swipes = await _swipeRepository.Query().Where(u => u.UserId == loggedInUser.Id).ToListAsync();

        return Ok(swipes);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult> PostSwipe([FromBody] SwipeDto swipeDto)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        if (swipeDto.SwipedUserId == loggedInUser.Id)
        {
            return BadRequest("Can't swipe self");
        }

        var swipedUser = await _userRepository.GetById(swipeDto.SwipedUserId);

        var swipe = new Swipes
        {
            UserId = loggedInUser.Id,
            User = loggedInUser,
            SwipedUserId = swipeDto.SwipedUserId,
            SwipedUser = swipedUser!,
            SwipeType = swipeDto.SwipeType,
            CreatedAt = DateTime.Now
        };

        await _swipeRepository.Add(swipe);
        return Ok();
    }
}