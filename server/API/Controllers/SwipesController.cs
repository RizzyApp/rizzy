using API.Contracts;
using API.Data.Models;
using API.Data.Repositories;
using API.Services;
using API.Utils.Exceptions;
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
    private readonly ILogger<SwipesController> _logger;

    public SwipesController(
        IRepository<Swipes> swipeRepository,
        IMatchService matchService,
        IRepository<User> userRepository,
        IUserService userService,
        ILogger<SwipesController> logger)
    {
        _swipeRepository = swipeRepository;
        _userRepository = userRepository;
        _userService = userService;
        _matchService = matchService;
        _logger = logger;
    }

    [Authorize]
    [HttpGet]
    [Route("/api/v1/user/swipes")]
    public async Task<ActionResult<IEnumerable<Swipes>>> GetSwipes()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        var swipes = await _swipeRepository.Query().Where(u => u.UserId == loggedInUser.Id).ToListAsync();
        _logger.LogInformation("Fetched {Count} swipes for UserId {UserId}.", swipes.Count, loggedInUser.Id);

        return Ok(swipes);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult> PostSwipe([FromBody] SwipeDto swipeDto)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        if (swipeDto.SwipedUserId == loggedInUser.Id)
        {
            _logger.LogWarning("PostSwipe failed: User {UserId} attempted to swipe on themselves.", loggedInUser.Id);
            return BadRequest("Can't swipe self.");
        }

        var swipedUser = await _userRepository.GetByIdAsync(swipeDto.SwipedUserId);
        if (swipedUser == null)
        {
            _logger.LogWarning("PostSwipe failed: Swiped user with ID {SwipedUserId} does not exist.", swipeDto.SwipedUserId);
            return BadRequest($"Swiped user with ID {swipeDto.SwipedUserId} does not exist.");
        }

        var existingSwipe = await _swipeRepository.FindFirstAsync(s =>
            s.UserId == loggedInUser.Id && s.SwipedUserId == swipedUser.Id);

        if (existingSwipe != null)
        {
            _logger.LogWarning("PostSwipe failed: User {UserId} has already swiped on User {SwipedUserId}.", loggedInUser.Id, swipedUser.Id);
            throw new BadRequestException("You have already swiped on this user.");
        }

        var swipe = new Swipes
        {
            UserId = loggedInUser.Id,
            SwipedUserId = swipedUser.Id,
            SwipeType = swipeDto.SwipeType,
            CreatedAt = DateTime.Now
        };

        await _swipeRepository.AddAsync(swipe);
        _logger.LogInformation("User {UserId} swiped {SwipeType} on User {SwipedUserId}.", loggedInUser.Id, swipe.SwipeType, swipedUser.Id);

        if (swipe.SwipeType == "right")
        {
            await _matchService.CreateMatchIfMutualAsync(loggedInUser, swipedUser);
            _logger.LogInformation("Checked for mutual match between User {UserId} and User {SwipedUserId}.", loggedInUser.Id, swipedUser.Id);
        }

        return Ok();
    }

    [Authorize]
    [HttpDelete]
    [Route("/api/v1/user/swipes/all")]
    public async Task<IActionResult> DeleteSwipes([FromServices] IHostEnvironment hostEnvironment)
    {
        if (!hostEnvironment.IsDevelopment())
        {
            _logger.LogWarning("DeleteSwipes failed: Attempt to delete swipes in non-development environment.");
            return Forbid("This action is restricted to the development environment.");
        }

        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        loggedInUser = _userRepository.Query()
            .Include(u => u.Swipes)
            .FirstOrDefault(u => u.Id == loggedInUser.Id);

        if (loggedInUser == null || loggedInUser.Swipes == null)
        {
            _logger.LogWarning("DeleteSwipes failed: No swipes found for User {UserId}.", loggedInUser?.Id);
            return NotFound("No swipes found.");
        }

        await _swipeRepository.RemoveRangeAsync(loggedInUser.Swipes);
        _logger.LogInformation("Deleted all swipes for UserId {UserId}.", loggedInUser.Id);

        return NoContent();
    }
}
