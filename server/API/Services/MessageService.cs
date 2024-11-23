using API.Contracts;
using API.Contracts.Messages;
using API.Data.Models;
using API.Data.Repositories;
using API.Hubs;
using API.Utils.Exceptions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class MessageService : IMessageService
{
    private IRepository<MatchInfo> _matchRepository;
    private IRepository<Message> _messageRepository;
    private IHubContext<ChatHub, IChatHubClient> _chatHubContext;
    private IHubContext<NotificationHub, INotificationHubClient> _notificationHubContext;


    public MessageService(IRepository<MatchInfo> matchRepository, IHubContext<ChatHub, IChatHubClient> chatHubContext,
        IHubContext<NotificationHub, INotificationHubClient> notificationHubContext, IRepository<Message> messageRepository)
    {
        _matchRepository = matchRepository;
        _chatHubContext = chatHubContext;
        _notificationHubContext = notificationHubContext;
        _messageRepository = messageRepository;
    }


    public async Task<MessageResponse> SendMessageToUser(int senderUserId, SendMessageRequest messageRequest)
    {
        var matchInfo = await _matchRepository
            .Query()
            .Include(m => m.Users)
            .Where(m => m.Users.Any(u => u.Id == messageRequest.ReceiverId) && m.Users.Any(u => u.Id == senderUserId))
            .FirstOrDefaultAsync();
        if (matchInfo is null)
        {
            throw new BadRequestException(
                $"user with Id: {senderUserId} is not matched with user Id: {messageRequest.ReceiverId}");
        }

        var message = new Message
        {
            SenderUserId = senderUserId,
            ReceiverUserId =  messageRequest.ReceiverId,
            MessageText = messageRequest.Content,
            MatchInfoId = matchInfo.Id,
            SentMessageAt = messageRequest.TimeStamp
        };

        var addedMessage = await _messageRepository.AddAsync(message);

        var messageResponse = new MessageResponse
        {
            MessageId = addedMessage.Id,
            Content = addedMessage.MessageText,
            SenderId = addedMessage.SenderUserId,
            TimeStamp = addedMessage.SentMessageAt
        };
        
        await _chatHubContext.Clients.User(messageRequest.ReceiverId.ToString()).ReceiveMessage(messageResponse);

        return messageResponse;
    }
}