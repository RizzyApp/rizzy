using API.Contracts.Messages;
using API.Data.Models;
using API.Data.Repositories;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class MessageController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMessageService _messageService;
    private readonly IRepository<User> _userRepository;
    private readonly ILogger<MessageController> _logger;

    public MessageController(
        IUserService userService,
        IRepository<User> userRepository,
        IMessageService messageService,
        ILogger<MessageController> logger)
    {
        _userService = userService;
        _userRepository = userRepository;
        _messageService = messageService;
        _logger = logger;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<MessageResponse>> SendMessage([FromBody] SendMessageRequest messageRequest)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        var receivingUser = await _userRepository.GetByIdAsync(messageRequest.ReceiverId);
        if (receivingUser == null)
        {
            _logger.LogWarning("SendMessage failed: Receiving user with ID {ReceiverId} does not exist.", messageRequest.ReceiverId);
            return BadRequest($"User with ID: {messageRequest.ReceiverId} does not exist.");
        }

        var message = await _messageService.SendMessageToUser(loggedInUser.Id, messageRequest);
        _logger.LogInformation("Message sent successfully from UserId {SenderId} to UserId {ReceiverId}.", loggedInUser.Id, messageRequest.ReceiverId);

        return Ok(message);
    }

    [Authorize]
    [HttpGet("by-sender")]
    public async Task<ActionResult<MessagesBySenderResponse>> GetMessagesBySender()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        var groupedMessages = await _messageService.GetMessagesBySender(loggedInUser.Id);
        _logger.LogInformation("Fetched messages for sender UserId {SenderId}.", loggedInUser.Id);

        return Ok(groupedMessages);
    }
}
