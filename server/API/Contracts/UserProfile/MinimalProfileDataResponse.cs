namespace API.Contracts.UserProfile;

public record MinimalProfileDataResponse(
    int UserId,
    string Name,
    string? ProfilePic,
    DateTime? LastActive
    );
