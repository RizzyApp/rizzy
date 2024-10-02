namespace API.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public Gender Gender { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public List<PhotoList> Photos { get; set; } = new List<PhotoList>();
    public DateOnly BirthDate { get; set; }
    public string Bio { get; set; }
    public bool IsVerified { get; set; } = false;
    public string Role { get; set; }
    public DateTime CreateDate { get; set; } = DateTime.Now;
    public DateTime LastActivity { get; set; } = DateTime.Now;
    public List<Match> Matches { get; set; } = new List<Match>();
    public List<Blocked> Blockeds { get; set; } = new List<Blocked>();
}