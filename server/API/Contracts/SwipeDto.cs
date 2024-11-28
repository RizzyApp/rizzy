using System.ComponentModel.DataAnnotations;

namespace API.Contracts;

public class SwipeDto
{
    public int SwipedUserId { get; set; }
    
    [Required]
    [RegularExpression(@"^(right|left)$", ErrorMessage = "SwipeType must be 'right' or 'left'.")]
    public string SwipeType { get; set; }
}