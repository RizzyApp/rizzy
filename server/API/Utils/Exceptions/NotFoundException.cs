using System.Net;

namespace API.Utils.Exceptions;

public class NotFoundException(string id)
    : BaseException($"The requested resource with id {id} could not be found", HttpStatusCode.NotFound);