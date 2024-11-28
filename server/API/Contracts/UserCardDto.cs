namespace API.Contracts;

public record UserCardDto(int Id, string Name, int Age, string Bio, int Distance, IEnumerable<string> Photos);
