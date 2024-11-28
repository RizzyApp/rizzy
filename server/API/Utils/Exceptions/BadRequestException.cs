using System.Net;

namespace API.Utils.Exceptions;

public class BadRequestException(string message)
    : BaseException(message, HttpStatusCode.BadRequest);
