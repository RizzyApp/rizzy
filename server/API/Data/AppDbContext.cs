using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public DbSet<Swipes> Swipes { get; set; }
    public DbSet<MatchInfo> MatchInfos { get; set; }
    public DbSet<UserLocations> UserLocations { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<BlockedUser> BlockedUsers { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<UserLoginDetail> UserLoginDetails { get; set; }
    public DbSet<UserMatchInfo> UserMatchInfos { get; set; }

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
            .WithMany()
            .HasForeignKey(u => u.AspNetUserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

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
    }
}