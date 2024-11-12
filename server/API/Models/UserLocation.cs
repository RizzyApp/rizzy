
namespace API.Models;

public class UserLocation
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public decimal Longitude { get; set; }
    public decimal Latitude { get; set; }
    public User User { get; set; }
}