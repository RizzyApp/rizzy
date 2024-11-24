using API.Contracts.Messages;

namespace API.Services;

public interface IMessageService
{
    Task<MessageResponse> SendMessageToUser(int senderUserId, SendMessageRequest messageRequest);
    Task<MessagesBySenderResponse> GetMessagesBySender(int loggedInUserId);
}