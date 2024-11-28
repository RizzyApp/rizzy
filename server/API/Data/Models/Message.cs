using System.ComponentModel.DataAnnotations;
using API.Data.Enums;

namespace API.Data.Models;

public class Message
{
    public int Id { get; set; }
    
    [Required]
    public int SenderUserId { get; set; }
    [Required]
    public int ReceiverUserId { get; set; }
    [Required]
    public string MessageText { get; set; }
    
    public MessageStatus Status { get; set; }
    public int MatchInfoId { get; set; }
    public DateTime SentMessageAt { get; set; }

    public User SenderUser { get; set; }
    public User ReceiverUser { get; set; }
    public MatchInfo MatchInfo { get; set; }
}