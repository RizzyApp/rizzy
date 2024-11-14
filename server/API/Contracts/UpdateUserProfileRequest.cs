namespace API.Contracts;

public record UpdateUserProfileRequest(
    string Name,
    string Bio,
    string[]? Interests,
    int PreferredMinAge,
    int PreferredMaxAge,
    int PreferredLocationRange,
    int PreferredGender
    );