using API.Contracts;

namespace API.Hubs;

public interface INotificationHubClient
{
    Task ReceiveMatchNotification(MatchNotification matchNotification);
}