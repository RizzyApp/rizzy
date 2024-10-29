using System.ComponentModel.DataAnnotations;

namespace API.Contracts;

public record CreateProfileRequest(
    [Required]string Name, 
    [Required]int Gender,
    [Required]DateTime BirthDate,
    string Bio
    );