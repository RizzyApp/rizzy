using System.Security.Claims;
using API.Authentication;

namespace API.Utils;

public static class ClaimsPrincipalExtensions
{
    /// <summary>
    /// Retrieves the <see cref="ClaimTypes.NameIdentifier"/> claim value from the current <see cref="ClaimsPrincipal"/>.
    /// This method should only be used when the <see cref="AuthorizeWithUserIdAttribute"/>  is applied to the action.
    /// </summary>
    /// <param name="user">The <see cref="ClaimsPrincipal"/> representing the authenticated user.</param>
    /// <returns>
    /// A non-null <see cref="string"/> representing the user's unique identifier (userId).
    /// </returns>
    /// <exception cref="InvalidOperationException">
    /// Thrown when the <see cref="ClaimTypes.NameIdentifier"/> claim is missing, 
    /// which should not occur if the <see cref="AuthorizeWithUserIdAttribute"/>  is applied to the action.
    /// </exception>
    public static string GetUserId(this ClaimsPrincipal user)
    {
        var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId is null)
        {
            throw new InvalidOperationException("UserId claim is missing despite policy.");
        }

        return userId;
    }
}