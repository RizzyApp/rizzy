namespace API.Contracts.UserProfile;

public record CreateProfileResponse(
    string Name, 
    int Gender,
    DateTime BirthDate,
    string Bio
    );