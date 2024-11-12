using API.Models;

namespace API.Contracts;

public record UserCardDto(int Id, string Name, int Age, string Bio, double Distance, IEnumerable<string> Photos);
