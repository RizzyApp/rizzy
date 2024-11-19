using System.Security.Claims;
using API.Contracts;
using API.Data.Models;
using API.Utils.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class UserService : IUserService
{
    private readonly IRepository<User> _userRepository;
    private readonly ILogger<UserService> _logger;

    public UserService(IRepository<User> userRepository, ILogger<UserService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    public async Task<User> GetUserByIdentityIdAsync(ClaimsPrincipal userClaims)
    {
        var identityUserId = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (identityUserId is null)
        {
            throw new MissingClaimException();
        }

        var searchResults = await _userRepository.Search(user => user.AspNetUserId == identityUserId);

        var user = searchResults.FirstOrDefault();

        if (user is null)
        {
            _logger.LogCritical(
                "An IdentityUser with Identity Id: {identityUserId} is not paired with an actual user in the database",
                identityUserId);
            throw new InternalServerException();
        }

        return user;
    }
    
    public async Task<IEnumerable<UserCardDto>> GetFilteredUsersAsync(
        int? userId, int? preferredGender, int minAge, int maxAge,
        decimal latitude, decimal longitude, int locationRange, int amount, IEnumerable<int>? excludedUserIds = null)
    {
        const double kmToDegrees = 0.009;
        var minLat = latitude - (decimal)(locationRange * kmToDegrees);
        var maxLat = latitude + (decimal)(locationRange * kmToDegrees);
        var minLon = longitude - (decimal)(locationRange * kmToDegrees);
        var maxLon = longitude + (decimal)(locationRange * kmToDegrees);

        excludedUserIds ??= Enumerable.Empty<int>();

        var users =  await _userRepository.Query()
            .Include(u => u.Photos)
            .Include(u => u.UserLocation)
            .Include(u => u.Swipes)
            .Where(u => u.Id != userId) 
            .Where(u => !excludedUserIds.Contains(u.Id)) 
            .Where(u => preferredGender == 2 || u.Gender == preferredGender)
            .Where(u => u.UserLocation.Latitude >= minLat && u.UserLocation.Latitude <= maxLat)
            .Where(u => u.UserLocation.Longitude >= minLon && u.UserLocation.Longitude <= maxLon)
            .ToListAsync();

        return users
            .Where(u => GetAge(u.BirthDate) >= minAge && GetAge(u.BirthDate) <= maxAge)
            .Where(u => GetDistance(latitude, longitude, u.UserLocation.Latitude, u.UserLocation.Longitude) <=
                        locationRange)
            .Select(u => new UserCardDto(
                u.Id,
                u.Name,
                GetAge(u.BirthDate),
                u.Bio,
                (int)GetDistance(latitude, longitude, u.UserLocation.Latitude, u.UserLocation.Longitude),
                u.Photos.Select(p => p.Url)
            ))
            .Take(amount)
            .ToList();
    }
    
    private static int GetAge(DateTime birthDate)
    {
        return DateTime.Now.Year - birthDate.Year;
    }

    private static double GetDistance(decimal latitude1, decimal longitude1, decimal latitude2, decimal longitude2)
    {
        const double earthRadiusKm = 6371.0;

        var lat1 = (double)latitude1 * Math.PI / 180.0;
        var lon1 = (double)longitude1 * Math.PI / 180.0;
        var lat2 = (double)latitude2 * Math.PI / 180.0;
        var lon2 = (double)longitude2 * Math.PI / 180.0;

        var dlat = lat2 - lat1;
        var dlon = lon2 - lon1;

        var a = Math.Sin(dlat / 2) * Math.Sin(dlat / 2) +
                Math.Cos(lat1) * Math.Cos(lat2) *
                Math.Sin(dlon / 2) * Math.Sin(dlon / 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

        return earthRadiusKm * c;

    }
}