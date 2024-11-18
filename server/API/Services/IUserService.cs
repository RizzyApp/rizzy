using System.Security.Claims;
using API.Data.Models;
using API.Models;

namespace API.Services;

public interface IUserService
{
   Task<User> GetUserByIdentityIdAsync(ClaimsPrincipal userClaims);
}