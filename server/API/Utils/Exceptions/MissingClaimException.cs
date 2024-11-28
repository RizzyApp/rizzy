using System.Net;

namespace API.Utils.Exceptions;

public class MissingClaimException() : BaseException("User is not authorized", HttpStatusCode.Unauthorized);