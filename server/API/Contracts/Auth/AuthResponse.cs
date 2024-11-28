namespace API.Contracts.Auth;

public record AuthResponse(
    string Email,
    int UserId,
    string Name,
    IEnumerable<string> Roles,
    string? Message);