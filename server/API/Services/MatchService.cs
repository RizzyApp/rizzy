using API.Contracts;
using API.Contracts.Photo;
using API.Data.Models;
using API.Data.Repositories;
using API.Hubs;
using API.Utils.Exceptions;
using Microsoft.AspNetCore.SignalR;

namespace API.Services;

public class MatchService : IMatchService
{
    private readonly IRepository<Swipes> _swipeRepository;
    private readonly IRepository<MatchInfo> _matchRepository;
    private readonly IRepository<Photo> _photoRepository;
    private readonly IHubContext<NotificationHub, INotificationHubClient> _hubContext;

    public MatchService(IRepository<MatchInfo> matchRepository, IRepository<Swipes> swipeRepository,
        IHubContext<NotificationHub, INotificationHubClient> hubContext, IRepository<Photo> photoRepository)
    {
        _matchRepository = matchRepository;
        _swipeRepository = swipeRepository;
        _hubContext = hubContext;
        _photoRepository = photoRepository;
    }


    public async Task<MatchInfo?> CreateMatchIfMutualAsync(User loggedInUser, User swipedUser)
    {
        var swipeResult = await _swipeRepository.FindFirstAsync(s =>
            s.UserId == swipedUser.Id && s.SwipeType == "right" && s.SwipedUserId == loggedInUser.Id);

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

        var pfp = await _photoRepository.FindFirstAsync(p => p.UserId == swipedUser.Id);
        var pfpDto = pfp is null ? null : new PhotoDto(pfp.Id, pfp.Url);

        var matchNotification = new MatchNotification(pfpDto, swipedUser.Name, match.Id);

        await _hubContext.Clients.User(loggedInUser.Id.ToString()).ReceiveMatchNotification(matchNotification);
        await _hubContext.Clients.User(swipedUser.Id.ToString()).ReceiveMatchNotification(matchNotification);

        return match;
    }
}