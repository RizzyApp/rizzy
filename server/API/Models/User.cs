using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Identity;

namespace API.Models;

public class User
{
    public int Id { get; set; }
    public string AspNetUserId { get; }
    
    public IdentityUser AspNetUser { get; }
    
    public string Name { get; set; }
    public int Gender { get; set; }
    public DateTime BirthDate { get; set; }
    public string Bio { get; set; }
    public bool Verified { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastActivityDate { get; set; }

    public ICollection<BlockedUser> BlockedUsers { get; set; }
    public ICollection<Message> Messages { get; set; }
    public ICollection<Photo> Photos { get; set; }
    public ICollection<UserLoginDetail> UserLoginDetails { get; set; }
    public ICollection<UserMatchInfo> UserMatchInfos { get; set; }
    public ICollection<UserLocations> UserLocations { get; set; }
}