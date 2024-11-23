using System.Collections.Concurrent;
using API.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

[Authorize]
public class NotificationHub : Hub<INotificationHubClient>
{
    public async Task NotifyMatchAsync(string userId, MatchNotification matchNotification)
    {
        await Clients.User(userId).ReceiveMatchNotification(matchNotification);
    }
}