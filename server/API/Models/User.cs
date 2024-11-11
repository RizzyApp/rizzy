using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Identity;

namespace API.Models;

public class User
{
    public int Id { get; set; }
    public string AspNetUserId { get; }
    [Required]
    public IdentityUser? AspNetUser { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int Gender { get; set; }
    public DateTime BirthDate { get; set; }
    public string Bio { get; set; }
    public bool Verified { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastActivityDate { get; set; }
    public string[]? Interests { get; set; }
    public int PreferredMinAge { get; set; }
    public int PreferredMaxAge { get; set; }
    public int PreferredLocationRange { get; set; }
    public int PreferredGender { get; set; }
    
    [InverseProperty("User")]
    public ICollection<Swipes> Swipes { get; set; }
    public ICollection<BlockedUser> BlockedUsers { get; set; }
    public ICollection<Message> Messages { get; set; }
    public ICollection<Photo> Photos { get; set; }
    public ICollection<UserLoginDetail> UserLoginDetails { get; set; }
    public ICollection<UserMatchInfo> UserMatchInfos { get; set; }
    public ICollection<UserLocations> UserLocations { get; set; }
}