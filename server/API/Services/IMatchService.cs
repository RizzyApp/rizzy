using API.Contracts.UserProfile;
using API.Data.Models;

namespace API.Services;

public interface IMatchService
{
    Task<MatchInfo?> CreateMatchIfMutualAsync(User loggedInUser, User swipedUser);
    Task<IEnumerable<MinimalProfileDataResponse>> GetMatchedUsersMinimalData(int loggedInUserId);
}