using Microsoft.AspNetCore.Identity;

namespace API.Authentication;

public interface ITokenService
{
    string CreateToken(IdentityUser user, string role);
}