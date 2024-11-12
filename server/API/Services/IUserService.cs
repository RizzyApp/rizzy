using System.Security.Claims;
using API.Models;

namespace API.Services;

public interface IUserService
{
   Task<User> GetUserByIdentityIdAsync(ClaimsPrincipal userClaims);
}