
namespace API.Models;

public class UserLocations
{
    public int Id { get; set; }
    public decimal Longitude { get; set; }
    public decimal Latitude { get; set; }
    public ICollection<User> Users { get; set; }
}