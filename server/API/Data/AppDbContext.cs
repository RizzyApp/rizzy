using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext : DbContext
{
    public DbSet<MatchInfo> MatchInfos { get; set; }
    public DbSet<UserLocations> UserLocations { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<BlockedUser> BlockedUsers { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<UserLoginDetail> UserLoginDetails { get; set; }
    public DbSet<UserMatchInfo> UserMatchInfos { get; set; }
    public UsersUserLocation UsersUserLocations { get; set; }

    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.BlockedUsers)
            .WithOne(b => b.User)
            .HasForeignKey(b => b.UserId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Messages)
            .WithOne(m => m.User)
            .HasForeignKey(m => m.UserId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Photos)
            .WithOne(p => p.User)
            .HasForeignKey(p => p.UserId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.UserLoginDetails)
            .WithOne(ul => ul.User)
            .HasForeignKey(ul => ul.UserId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.UserMatchInfos)
            .WithOne(umi => umi.User)
            .HasForeignKey(umi => umi.UserId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.UsersUserLocations)
            .WithOne(ul => ul.User)
            .HasForeignKey(ul => ul.UserId);

        modelBuilder.Entity<Message>()
            .HasOne(m => m.MatchInfo)
            .WithMany(mi => mi.Messages)
            .HasForeignKey(m => m.MatchInfoId);

        modelBuilder.Entity<UserMatchInfo>()
            .HasOne(umi => umi.MatchInfo)
            .WithMany(mi => mi.UserMatchInfos)
            .HasForeignKey(umi => umi.MatchInfoId);

        modelBuilder.Entity<UsersUserLocation>()
            .HasOne(ul => ul.Locations)
            .WithMany(l => l.UsersUserLocations)
            .HasForeignKey(ul => ul.LocationsId);

        modelBuilder.Entity<BlockedUser>()
            .HasOne(bu => bu.User)
            .WithMany(u => u.BlockedUsers)
            .HasForeignKey(bu => bu.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Or NoAction

        modelBuilder.Entity<BlockedUser>()
            .HasOne(bu => bu.BlockedUserNavigation)
            .WithMany() // No navigation back to the user being blocked
            .HasForeignKey(bu => bu.BlockedUserId)
            .OnDelete(DeleteBehavior.Restrict); // Or NoAction

        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Gender = 1, Bio = "Developer", Verified = true, BirthDate = new DateTime(1990, 1, 1), CreatedAt = DateTime.Now },
            new User { Id = 2, Gender = 2, Bio = "Designer", Verified = false, BirthDate = new DateTime(1995, 5, 5), CreatedAt = DateTime.Now }
        );
    }
}