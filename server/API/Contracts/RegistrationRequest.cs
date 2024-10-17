using System.ComponentModel.DataAnnotations;

namespace API.Contracts;

public record RegistrationRequest(
    [Required]string Email, 
    [Required]string Username, 
    [Required]string Password);
