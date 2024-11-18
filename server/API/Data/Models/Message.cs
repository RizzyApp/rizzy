using API.Data.Models;

namespace API.Models;

public class Message
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string MessageText { get; set; }
    public int MatchInfoId { get; set; }
    public DateTime SentMessageAt { get; set; }

    public User User { get; set; }
    public MatchInfo MatchInfo { get; set; }
}