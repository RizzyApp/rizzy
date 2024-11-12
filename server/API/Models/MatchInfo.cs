namespace API.Models;

public class MatchInfo
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public ICollection<Message> Messages { get; set; }
    public ICollection<User> Users { get; set; }
}