using System.ComponentModel;

namespace API.Data.Enums;

public enum MessageStatus
{
    [Description("Message was saved, but user hasn't read it")]
    Delivered,
    
    [Description("User get the message and seen it")]
    Read
    
}