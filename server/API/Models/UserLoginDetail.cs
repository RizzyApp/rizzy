namespace API.Models;

public class UserLoginDetail
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public byte[] Password { get; set; }
    public string Role { get; set; }

    public User User { get; set; }
}