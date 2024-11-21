using API.Data.Models;

namespace API.Services;

public interface IMatchService
{
    Task<MatchInfo?> CreateMatchIfMutualAsync(User loggedInUser, User swipedUser);
}