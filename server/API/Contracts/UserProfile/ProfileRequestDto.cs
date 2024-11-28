using System.ComponentModel.DataAnnotations;
using API.Utils.Validators;

namespace API.Contracts.UserProfile
{
    public record ProfileRequestDto(
        [Required] string Name,

        [Required]
        [Range(0, 1, ErrorMessage = "Gender must be 0 or 1.")]
        int Gender,

        [Required] [MinAge(18)] DateTime BirthDate,

        [MaxLength(500, ErrorMessage = "Bio cannot exceed 500 characters.")]
        string Bio,

        [MaxLength(10, ErrorMessage = "Can't have more than 10 interests.")]
        string[] Interests,

        [Range(18, 99, ErrorMessage = "Preferred age must be between 18 and 99.")]
        int PreferredMinAge,

        [Range(18, 99, ErrorMessage = "Preferred age must be between 18 and 99.")]
        int PreferredMaxAge,

        [Range(1, 2000, ErrorMessage = "Preferred location range must be between 1 and 2000.")]
        int PreferredLocationRange,

        [Required]
        [Range(0, 2, ErrorMessage = "Preferred gender must be between 0 and 2.")]
        int PreferredGender
    );
}