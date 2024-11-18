using API.Data.Models;

namespace API.Models;

public class BlockedUser
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int BlockedUserId { get; set; }

    public User User { get; set; }
    public User BlockedUserNavigation { get; set; }
}