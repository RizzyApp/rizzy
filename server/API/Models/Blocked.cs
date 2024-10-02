namespace API.Models;

public class Blocked
{
    public int Id { get; set; }
    public User BlockedUser { get; set; } 
    public DateTime BlockedDate { get; set; } = DateTime.UtcNow;
}