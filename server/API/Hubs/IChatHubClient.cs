using API.Data.Models;

namespace API.Hubs;

public interface IChatHubClient
{
    Task ReceiveMessage(Message message);
}