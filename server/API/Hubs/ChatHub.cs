using System.Collections.Concurrent;
using API.Contracts.Messages;
using API.Data.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

public class ChatHub : Hub<IChatHubClient>
{
    public async Task ReceiveMessageAsync(string userId, MessageResponse message)
    {
        await Clients.User(userId).ReceiveMessage(message);
    }
}