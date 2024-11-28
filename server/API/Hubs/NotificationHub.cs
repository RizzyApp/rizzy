using System.Collections.Concurrent;
using API.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

[Authorize]
public class NotificationHub : BaseHub<INotificationHubClient>
{
    public NotificationHub(ILogger<BaseHub<INotificationHubClient>> logger) : base(logger)
    {
    }

    public async Task NotifyMatchAsync(string userId, MatchNotification matchNotification)
    {
        await Clients.User(userId).ReceiveMatchNotification(matchNotification);
    }
}