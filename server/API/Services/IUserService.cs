using System.Security.Claims;
using API.Contracts;
using API.Data.Models;

namespace API.Services;

public interface IUserService
{
    Task<User> GetUserByIdentityIdAsync(ClaimsPrincipal userClaims);

    public Task<IEnumerable<UserCardDto>> GetFilteredUsersAsync(
        int? userId, int preferredGender, int minAge, int maxAge,
        decimal latitude, decimal longitude, int locationRange, int amount, IEnumerable<int>? excludedUserIds = null);
}