using API.Data.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

public class ChatHub : Hub<IChatHubClient>
{
    public async Task ReceiveMessage(int userId, Message message)
    {
        await Clients.User(userId.ToString()).ReceiveMessage(message);
    }
}