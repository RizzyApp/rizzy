using API.Contracts;
using API.Data.Models;
using API.Data.Repositories;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class SwipesController : ControllerBase
{
    private readonly IRepository<Swipes> _swipeRepository;
    private readonly IRepository<User> _userRepository;
    private readonly IMatchService _matchService;
    private readonly IUserService _userService;

    public SwipesController(IRepository<Swipes> swipeRepository, IMatchService matchService, IRepository<User> userRepository, IUserService userService)
    {
        _swipeRepository = swipeRepository;
        _userRepository = userRepository;
        _userService = userService;
        _matchService = matchService;
    }

    [Authorize]
    [HttpGet]
    [Route("/api/v1/user/swipes")]
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

        var swipedUser = await _userRepository.GetByIdAsync(swipeDto.SwipedUserId);

        if (swipedUser is null)
        {
            return BadRequest($"swiped user with id {swipeDto.SwipedUserId} does not exist");
        }

        var swipe = new Swipes
        {
            UserId = loggedInUser.Id,
            User = loggedInUser,
            SwipedUserId = swipedUser.Id,
            SwipeType = swipeDto.SwipeType,
            CreatedAt = DateTime.Now
        };

        await _swipeRepository.AddAsync(swipe);
        await _matchService.CreateMatchIfMutualAsync(loggedInUser, swipedUser);
        return Ok();
    }
    
    [Authorize]
    [HttpDelete]
    [Route("/api/v1/user/swipes/all")]
    public async Task<IActionResult> DeleteSwipes([FromServices] IHostEnvironment hostEnvironment)
    {
        if (!hostEnvironment.IsDevelopment())
        {
            return Forbid("This action is restricted to the development environment.");
        }

        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);
        loggedInUser = _userRepository.Query()
            .Include(u => u.Swipes)
            .FirstOrDefault(u => u.Id == loggedInUser.Id);


        await _swipeRepository.RemoveRangeAsync(loggedInUser.Swipes);

        return NoContent();
    }

}