namespace API.Authentication;

public interface IAuthService
{
    Task<AuthResult> RegisterAsync(string email, string username, string password);
}
