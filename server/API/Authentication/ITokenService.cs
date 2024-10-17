using Microsoft.AspNetCore.Identity;

namespace API.Authentication;

public interface ITokenService
{
    public string CreateToken(IdentityUser user);
}