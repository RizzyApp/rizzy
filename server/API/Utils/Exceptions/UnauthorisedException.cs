using System.Net;

namespace API.Utils.Exceptions;

public class UnauthorisedException() : BaseException("user is not authorised to access the resource",
    HttpStatusCode.Forbidden);