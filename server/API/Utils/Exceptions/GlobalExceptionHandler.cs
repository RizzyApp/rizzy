using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace API.Utils.Exceptions;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var problemDetails = new ProblemDetails
        {
            Instance = httpContext.Request.Path,
            Status = httpContext.Response.StatusCode
        };

        if (exception is BaseException baseException)
        {
            httpContext.Response.StatusCode = (int)baseException.StatusCode;
            problemDetails.Title = baseException.Message;
            
            logger.LogWarning("Handled BaseException: {Message}", baseException.Message);
        }
        else
        {
            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            problemDetails.Title = "An unexpected error occurred.";
            
            logger.LogError(exception, "Unhandled exception occurred.");
        }

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken).ConfigureAwait(false);
        return true;
    }
}