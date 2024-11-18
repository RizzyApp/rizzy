using System.ComponentModel.DataAnnotations;

namespace API.Contracts.Auth;

public record RegistrationRequest(
    [Required]string Email, 
    [Required]string Password);
