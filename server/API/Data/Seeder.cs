using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seeder
{
    public static void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, FirstName = "Pista", LastName = "Erős",  Gender = 1, Bio = "Developer", Verified = true, BirthDate = new DateTime(1990, 1, 1), CreatedAt = DateTime.Now },
            new User { Id = 2, FirstName = "Anna", LastName = "Gyenge", Gender = 2, Bio = "Designer", Verified = false, BirthDate = new DateTime(1995, 5, 5), CreatedAt = DateTime.Now }
        );
        
        modelBuilder.Entity<Photo>().HasData(
            new Photo { Id = 1, UserId = 1, Url = "https://shorturl.at/MXkRc" },
            new Photo { Id = 2, UserId = 2, Url = "https://shorturl.at/MXkRc" }
        );

        modelBuilder.Entity<BlockedUser>().HasData(
            new BlockedUser { Id = 1, UserId = 1, BlockedUserId = 2 });

        modelBuilder.Entity<MatchInfo>().HasData(new MatchInfo{Id = 1, CreatedAt = DateTime.Now});
        
        modelBuilder.Entity<UserMatchInfo>().HasData(
            new UserMatchInfo { Id = 1, UserId = 1, MatchInfoId = 1 },
            new UserMatchInfo { Id = 2, UserId = 2, MatchInfoId = 1 }
        );

        modelBuilder.Entity<UserLocations>().HasData(
            new UserLocations { Id = 1, Latitude = 47.497913m, Longitude = 19.040236m }, //bp
            new UserLocations { Id = 2, Latitude = 47.497913m, Longitude = 19.040236m } //bp
        );
    }
}