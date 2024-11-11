namespace API.Models;

public class Swipes
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int SwipedUserId { get; set; }
    public User SwipedUser { get; set; }
    public string SwipeType { get; set; }
    public DateTime CreatedAt { get; set; }
}