using API.Models;

namespace API.Contracts;

public record UserProfileResponse
(
    string Name,
    int Gender,
    DateTime BirthDate,
    string Bio,
    bool Verified,
    string[]? Interests,
    int PreferredMinAge,
    int PreferredMaxAge,
    int PreferredLocationRange,
    int PreferredGender,
    ICollection<Photo> Photos
);