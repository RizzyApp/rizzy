using System.Security.Claims;
using API.Models;

namespace API.Services;

public interface IUserByIdentityService
{
   Task<User> GetUserByIdentityIdAsync(ClaimsPrincipal userClaims);
}