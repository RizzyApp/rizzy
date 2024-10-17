namespace API.Contracts;

public record CreateProfileResponse(
    string Name, 
    int Gender,
    DateTime BirthDate,
    string Bio
    );