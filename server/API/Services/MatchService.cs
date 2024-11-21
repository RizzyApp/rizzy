using API.Data.Models;
using API.Data.Repositories;
using API.Utils.Exceptions;

namespace API.Services;

public class MatchService : IMatchService
{

    private readonly IRepository<Swipes> _swipeRepository;
    private readonly IRepository<MatchInfo> _matchRepository;
    private readonly IRepository<User> _userRepository;
    
    public MatchService(IRepository<MatchInfo> matchRepository, IRepository<Swipes> swipeRepository, IRepository<User> userRepository)
    {
        _matchRepository = matchRepository;
        _swipeRepository = swipeRepository;
        _userRepository = userRepository;
    }
    
    
    public async Task<MatchInfo?> CreateMatchIfMutualAsync(User loggedInUser, User swipedUser)
    {
        var swipedUserSwipes = await _swipeRepository.SearchAsync(s =>
            s.UserId == swipedUser.Id && s.SwipeType == "right" && s.SwipedUserId == loggedInUser.Id);

        var swipeResult = swipedUserSwipes.FirstOrDefault();

        if (swipeResult == null)
        {
            return null;
        }

        var match = new MatchInfo
        {
            CreatedAt = DateTime.Now,
            Users = new List<User>
            {
                loggedInUser,
                swipedUser
            }
        };

        await _matchRepository.AddAsync(match);
        return match;
    }
}