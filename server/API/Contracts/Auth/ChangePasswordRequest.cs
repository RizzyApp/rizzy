using System.ComponentModel.DataAnnotations;

namespace API.Contracts.Auth;

public record ChangePasswordRequest(
    [Required] string CurrentPassword,
    [Required] string NewPassword);