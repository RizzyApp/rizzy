namespace API.Contracts.Messages;

public class MessageResponse
{
    public int MessageId { get; set; }
    public int SenderId { get; set; }
    public string Content { get; set; }
    public DateTime TimeStamp { get; set; }
}