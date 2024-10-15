namespace API.Models;

public class UsersUserLocation
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int LocationsId { get; set; }
    public User User { get; set; }
    public UserLocations Locations { get; set; }
}