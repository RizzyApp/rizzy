using System.Net;

namespace API.Utils.Exceptions;

public class NotFoundException(string? id = null)
    : BaseException(
        id != null
            ? $"The requested resource with id {id} could not be found"
            : $"The requested resource could not be found", HttpStatusCode.NotFound);