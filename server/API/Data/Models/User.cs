using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Data.Models;

public class User
{
    public int Id { get; set; }
    
    [Required]
    public string AspNetUserId { get; set; }
    [Required]
    public IdentityUser AspNetUser { get; set; }
    
    [Required]
    public string Name { get; set; }
    [Required]
    public int Gender { get; set; }
    
    [Required]
    public DateTime BirthDate { get; set; }
    public string Bio { get; set; }
    public bool Verified { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastActivityDate { get; set; }
    public string[]? Interests { get; set; }
    
    [Required]
    public int PreferredMinAge { get; set; }
    
    [Required]
    public int PreferredMaxAge { get; set; }
    
    [Required]
    public int PreferredLocationRange { get; set; }
    
    [Required]
    public int PreferredGender { get; set; }
    
    
    [InverseProperty("User")]
    public ICollection<Swipes>? Swipes { get; set; }
    public ICollection<BlockedUser>? BlockedUsers { get; set; }
    public ICollection<Message>? Messages { get; set; }
    public ICollection<Photo>? Photos { get; set; }
    public ICollection<MatchInfo>? MatchInfos { get; set; }
    public UserLocation UserLocation { get; set; }
}