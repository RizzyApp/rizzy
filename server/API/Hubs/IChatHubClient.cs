using API.Contracts.Messages;

namespace API.Hubs;

public interface IChatHubClient
{
    Task ReceiveMessage(MessageResponse message);
    
}