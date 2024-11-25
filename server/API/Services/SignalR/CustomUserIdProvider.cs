using API.Utils.Exceptions;
using Microsoft.AspNetCore.SignalR;

namespace API.Services.SignalR;

public class CustomUserIdProvider : IUserIdProvider
{
    private readonly IServiceProvider _serviceProvider;

    public CustomUserIdProvider(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }


    public string? GetUserId(HubConnectionContext connection)
    {
        using var scope = _serviceProvider.CreateScope();
        var userService = scope.ServiceProvider.GetRequiredService<IUserService>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<CustomUserIdProvider>>();

        try
        {
            var user = Task.Run(() => userService.GetUserByIdentityIdAsync(connection.User!)).Result;
            return user.Id.ToString(); 
        }
        catch (Exception ex)
        {
            logger.LogWarning( "Failed to resolve userId for SignalR connection");
            throw new UnauthorisedException();
        }
    }
}