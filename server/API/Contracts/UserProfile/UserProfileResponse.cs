namespace API.Contracts.UserProfile;

public record UserProfileResponse
(
    string Name,
    int Gender,
    int Age,
    DateTime BirthDate,
    string Bio,
    bool Verified,
    string[]? Interests,
    int PreferredMinAge,
    int PreferredMaxAge,
    int PreferredLocationRange,
    int PreferredGender,
    List<string> Photos
);