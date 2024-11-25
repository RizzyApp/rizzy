using API.Contracts.Photo;

namespace API.Contracts;

public record MatchNotification(
    PhotoDto? ProfilePic,
    string Name,
    int MatchId,
    int UserId);