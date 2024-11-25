namespace API.Contracts.Messages;

public class SendMessageRequest
{
    public int ReceiverId { get; set; }
    public string Content { get; set; }
    public DateTime TimeStamp { get; set; }
}