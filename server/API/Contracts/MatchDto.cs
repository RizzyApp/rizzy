using API.Contracts.Photo;

namespace API.Contracts;

public record MatchNotification(
    PhotoDto? OtherUserProfilePic,
    string OtherUserName,
    int MatchId);