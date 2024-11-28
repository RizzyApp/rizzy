using System.Collections.Concurrent;
using API.Contracts.Messages;
using API.Data.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

public class ChatHub : BaseHub<IChatHubClient>
{
    public ChatHub(ILogger<BaseHub<IChatHubClient>> logger) : base(logger)
    {
    }

    public async Task ReceiveMessageAsync(string userId, MessageResponse message)
    {
        await Clients.User(userId).ReceiveMessage(message);
    }
}