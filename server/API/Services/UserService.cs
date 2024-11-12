using System.Net;
using System.Security.Claims;
using API.Models;
using API.Utils.Exceptions;

namespace API.Services;

public class UserService : IUserService
{
    private readonly IRepository<User> _userRepository;
    private readonly ILogger<UserService> _logger;

    public UserService(IRepository<User> userRepository, ILogger<UserService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    public async Task<User> GetUserByIdentityIdAsync(ClaimsPrincipal userClaims)
    {
        var identityUserId = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (identityUserId is null)
        {
            throw new MissingClaimException();
        }

        var searchResults = await _userRepository.Search(user => user.AspNetUserId == identityUserId);

        var user = searchResults.FirstOrDefault();

        if (user is null)
        {
            _logger.LogCritical(
                "An IdentityUser with Identity Id: {identityUserId} is not paired with an actual user in the database",
                identityUserId);
            throw new InternalServerException();
        }

        return user;
    }
}