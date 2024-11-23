using API.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public DbSet<Swipes> Swipes { get; set; }
    public DbSet<MatchInfo> MatchInfos { get; set; }
    public DbSet<UserLocation> UserLocations { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<BlockedUser> BlockedUsers { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Photo> Photos { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<BlockedUser>()
            .HasOne(bu => bu.User)
            .WithMany(u => u.BlockedUsers)
            .HasForeignKey(bu => bu.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BlockedUser>()
            .HasOne(bu => bu.BlockedUserNavigation)
            .WithMany()
            .HasForeignKey(bu => bu.BlockedUserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<User>()
            .HasOne(u => u.AspNetUser)
            .WithOne()
            .HasForeignKey<User>(u => u.AspNetUserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.AspNetUserId)
            .IsUnique();

        modelBuilder.Entity<User>()
            .Property(u => u.Interests)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

        // Configure the relationship between User and Swipes for the swiping user
        modelBuilder.Entity<Swipes>()
            .HasOne(s => s.User)
            .WithMany(u => u.Swipes)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior
                .Restrict); // Prevent cascading deletes if needed

        // Configure the relationship for the swiped user
        modelBuilder.Entity<Swipes>()
            .HasOne(s => s.SwipedUser)
            .WithMany() // No navigation property on the 'User' for 'SwipedUser'
            .HasForeignKey(s => s.SwipedUserId)
            .OnDelete(DeleteBehavior.Restrict);
        
        // Message config for sender and receiver
        modelBuilder.Entity<Message>()
            .HasOne(m => m.SenderUser)
            .WithMany()
            .HasForeignKey(m => m.SenderUserId)
            .OnDelete(DeleteBehavior.Restrict); 

        
        modelBuilder.Entity<Message>()
            .HasOne(m => m.ReceiverUser)
            .WithMany()
            .HasForeignKey(m => m.ReceiverUserId)
            .OnDelete(DeleteBehavior.Restrict); 
        
        
        //INDEXES
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Gender)
            .HasDatabaseName("IX_User_Gender");
        
        modelBuilder.Entity<User>()
            .HasIndex(u => u.BirthDate)
            .HasDatabaseName("IX_User_BirthDate");
        
        modelBuilder.Entity<User>()
            .HasIndex(u => new { u.PreferredMinAge, u.PreferredMaxAge })
            .HasDatabaseName("IX_User_PreferredAge");

        modelBuilder.Entity<User>()
            .HasIndex(u => u.PreferredLocationRange)
            .HasDatabaseName("IX_User_PreferredLocation");
        
        modelBuilder.Entity<UserLocation>()
            .HasIndex(ul => new { ul.Latitude, ul.Longitude })
            .HasDatabaseName("IX_UserLocation_LatLon");
        
    }
}