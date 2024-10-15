namespace API.Models;

public class UserMatchInfo
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int MatchInfoId { get; set; }

    public User User { get; set; }
    public MatchInfo MatchInfo { get; set; }
}
