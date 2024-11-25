using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

public abstract class BaseHub<T> : Hub<T> where T : class
{
    private static readonly Dictionary<Type, int> ConnectionCounts = new();
    private static readonly object _lock = new object();
    private readonly ILogger<BaseHub<T>> _logger;

    protected BaseHub(ILogger<BaseHub<T>> logger)
    {
        _logger = logger;
    }
    
    private int ConnectionCount
    {
        get
        {
            lock (_lock)
            {
                var type = GetType();
                return ConnectionCounts.GetValueOrDefault(type, 0);
            }
        }
        set
        {
            lock (_lock)
            {
                var type = GetType();
                if (!ConnectionCounts.TryAdd(type, value))
                {
                    ConnectionCounts[type] = value;
                }
            }
        }
    }

    public override async Task OnConnectedAsync()
    {
        ConnectionCount++;
        _logger.LogInformation("{HubType} - Connection opened. Total connections: {ConnectionCount}", GetType().Name, ConnectionCount);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        ConnectionCount--;
        _logger.LogInformation("{HubType} - Connection closed. Total connections: {ConnectionCount}", GetType().Name, ConnectionCount);
        if (exception != null)
        {
            _logger.LogWarning(exception, "{HubType} - Connection closed with exception.", GetType().Name);
        }

        await base.OnDisconnectedAsync(exception);
    }
}