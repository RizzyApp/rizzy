using System.Net;

namespace API.Utils.Exceptions;

public class InvalidImageException()
    : BaseException("The provided file is not an image or is corrupted.", HttpStatusCode.BadRequest);
