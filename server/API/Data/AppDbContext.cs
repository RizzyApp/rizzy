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

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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

        modelBuilder.Entity<User>()
            .HasOne(u => u.AspNetUser)
            .WithMany()
            .HasForeignKey(u => u.AspNetUserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade); 
        
        //Seeder.SeedData(modelBuilder);
    }
}