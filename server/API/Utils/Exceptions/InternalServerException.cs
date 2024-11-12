using System.Net;

namespace API.Utils.Exceptions;

public class InternalServerException(): BaseException("An error occured, please try again later");