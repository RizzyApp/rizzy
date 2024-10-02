namespace API.Models;

public class Match
{
    public int Id { get; set; }
    public User MatchedUser { get; set; }
    public DateTime MatchDate { get; set; } = DateTime.UtcNow;
}