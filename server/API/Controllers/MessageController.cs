using API.Contracts;
using API.Contracts.Messages;
using API.Data.Models;
using API.Data.Repositories;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class MessageController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMessageService _messageService;
    private readonly IRepository<User> _userRepository;


    public MessageController(IUserService userService,
        IRepository<User> userRepository, IMessageService messageService)
    {
        _userService = userService;

        _userRepository = userRepository;
        _messageService = messageService;
    }


    [Authorize]
    [HttpPost]
    public async Task<ActionResult<MessageResponse>> SendMessage([FromBody] SendMessageRequest messageRequest)
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        var receivingUser = await _userRepository.GetByIdAsync(messageRequest.ReceiverId);

        if (receivingUser is null)
        {
            return BadRequest($"user with Id: {messageRequest.ReceiverId} does not exit");
        }

        var message = await _messageService.SendMessageToUser(loggedInUser.Id, messageRequest);

        return Ok(message);
    }

    [Authorize]
    [HttpGet("by-sender")]
    public async Task<ActionResult<MessagesBySenderResponse>> GetMessagesBySender()
    {
        var loggedInUser = await _userService.GetUserByIdentityIdAsync(User);

        var groupedMessages = await _messageService.GetMessagesBySender(loggedInUser.Id);

        return Ok(groupedMessages);
    }
}