namespace API.Contracts.Messages;

public class MessagesBySenderResponse
{
    public required Dictionary<int, List<MessageResponse>> Data { get; set; }
}