using Microsoft.AspNetCore.Authorization;

namespace API.Authentication;

/// <summary>
/// An authorization attribute that ensures the user has the "NameIdentifier" claim.
/// Inherits from <see cref="AuthorizeAttribute"/> and uses the "HasNameIdentifier" policy.
/// </summary>
public class AuthorizeWithNameIdAttribute() : AuthorizeAttribute("HasNameIdentifier");