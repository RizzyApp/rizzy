using API.Data.Models;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public static class AppDbSeeder
{
    private static readonly Random Random = new Random(50);

    public static async Task SeedDataAsync(AppDbContext context, UserManager<IdentityUser> userManager)
    {
        if (!await context.Users.AnyAsync())
        {
            var budapestLocation = new UserLocation
                { Latitude = 47.4979M, Longitude = 19.0402M }; // Budapest coordinates

            var identityUsers = new List<IdentityUser>();
            var appUsers = new List<User>();

            for (int i = 1; i <= 100; i++)
            {
                var email = $"user{i}@example.com";

                // Create IdentityUser
                identityUsers.Add(new IdentityUser
                {
                    UserName = email,
                    Email = email,
                    EmailConfirmed = true
                });

                // Create App User with random data
                var birthYear = Random.Next(1980, 2005); // Random birth year between 1980 and 2005
                var birthMonth = Random.Next(1, 13); // Random month
                var birthDay = Random.Next(1, 28); // Random day (simplified to avoid invalid dates)

                var randomInterestBioIndex = Random.Next(0, interestsList.Count);
                var interests = interestsList[randomInterestBioIndex];
                var bio = bios[randomInterestBioIndex];

                var randomNameIndex = Random.Next(femaleNames.Count);
                var gender = Random.Next(0, 2);
                var name = gender == 1 ? maleNames[randomNameIndex] : femaleNames[randomNameIndex];
                var userLocation = new UserLocation
                    { Latitude = 47.4979M, Longitude = 19.0402M };

                var imageUrl = gender == 1 ? GetRandomMaleImage() : GetRandomFemaleImage();
                var photo = new Photo()
                {
                    Url = imageUrl
                };

                appUsers.Add(new User
                {
                    Name = name,
                    Gender = gender,
                    BirthDate = new DateTime(birthYear, birthMonth, birthDay),
                    Bio = bio,
                    Verified = Random.Next(0, 2) == 1, // Randomly verified or not
                    CreatedAt = DateTime.UtcNow,
                    Photos = [photo],
                    LastActivityDate = DateTime.UtcNow,
                    Interests = interests,
                    PreferredMinAge = Random.Next(20, 30), // Random age range
                    PreferredMaxAge = Random.Next(30, 40),
                    PreferredLocationRange = Random.Next(10, 100), // Random location range
                    PreferredGender = Random.Next(0, 3), // Random preferred gender
                    UserLocation = userLocation
                });
            }
            
            await SeedTestUserAsync(context, userManager);
            
            for (int i = 0; i < identityUsers.Count; i++)
            {
                var identityUser = identityUsers[i];
                var appUser = appUsers[i];

                // Add IdentityUser with hashed password
                var result = await userManager.CreateAsync(identityUser, "Password123!");
                if (result.Succeeded)
                {
                    appUser.AspNetUserId = identityUser.Id;
                    context.Users.Add(appUser);
                }
            }

            await context.SaveChangesAsync();
        }
    }

    private static async Task SeedTestUserAsync(AppDbContext context, UserManager<IdentityUser> userManager)
    {
        var testEmail = "test@gmail.com";

        var existingUser = await userManager.FindByEmailAsync(testEmail);
        if (existingUser == null)
        {
            var testUser = new IdentityUser
            {
                UserName = testEmail,
                Email = testEmail,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(testUser, "test123");
            if (result.Succeeded)
            {
                var testAppUser = new User
                {
                    Name = "Test User",
                    Gender = 0,
                    BirthDate = new DateTime(1990, 5, 15),
                    Bio = "Ladies and gentlemen watch out, here comes Test user ",
                    Verified = true,
                    CreatedAt = DateTime.UtcNow,
                    LastActivityDate = DateTime.UtcNow,
                    Interests = ["Coding, Reading, Traveling", "Testing ASP.NET applications with seed data for fun"],
                    PreferredMinAge = 20,
                    PreferredMaxAge = 100,
                    Photos =
                    [
                        new Photo
                        {
                            Url =
                                "https://my.kumonglobal.com/wp-content/uploads/2022/03/Learn-from-Rowan-Atkinson_Kumon-Malaysia_530x530_NewsThumbnail.jpg",
                        },
                        new Photo
                        {
                            Url =
                                "data:image/jpeg;base64,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"
                        },
                        new Photo
                        {
                            Url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh4WVAwlOj6XKpnXevQNEtqxssmeuEdo6jkQ&s"
                        }
                    ],
                    PreferredLocationRange = 50,
                    PreferredGender = 2,
                    UserLocation = new UserLocation
                        { Latitude = 47.4979M, Longitude = 19.0402M }
                };

                testAppUser.AspNetUserId = testUser.Id;
                context.Users.Add(testAppUser);
                await context.SaveChangesAsync();
            }
        }
    }

    private static List<string[]> interestsList = new()
    {
        new[] { "Traveling", "Photography" },
        new[] { "Cooking", "Fitness" },
        new[] { "Gaming", "Technology" },
        new[] { "Reading", "Writing" },
        new[] { "Music", "Dancing" },
        new[] { "Sports", "Hiking" },
        new[] { "Movies", "Theater" },
        new[] { "Art", "Painting" },
        new[] { "Fashion", "Shopping" },
        new[] { "Gardening", "DIY Projects" },
        new[] { "Coding", "Blogging" },
        new[] { "Investing", "Business" },
        new[] { "Yoga", "Meditation" },
        new[] { "Fitness", "Nutrition" },
        new[] { "Traveling", "Adventure Sports" },
        new[] { "Volunteering", "Social Work" },
        new[] { "Astronomy", "Science" },
        new[] { "Fishing", "Camping" },
        new[] { "Pets", "Animal Welfare" },
        new[] { "Collecting", "Antiques" }
    };

    private static List<string> bios = new()
    {
        "Loves traveling and exploring new cultures.",
        "A passionate foodie who enjoys cooking.",
        "Tech-savvy and always up for a gaming session.",
        "An avid reader and storyteller.",
        "Music is my therapy; dancing is my escape.",
        "Sports enthusiast and nature lover.",
        "Big movie buff and theater-goer.",
        "Aspiring artist with a love for painting.",
        "Fashion-forward and a shopaholic at heart.",
        "Green thumb with a knack for DIY projects.",
        "Code by day, blog by night.",
        "Finance geek who loves business talks.",
        "Yoga and mindfulness are my daily rituals.",
        "Fitness freak with a focus on healthy living.",
        "Adventure is my middle name.",
        "Volunteering makes my soul happy.",
        "Stargazer and science nerd.",
        "Fishing and camping trips are my favorite.",
        "Animal lover and advocate for their rights.",
        "Collector of unique items and antique treasures."
    };

    private static List<string> maleNames = new()
    {
        "Bob", "Charlie", "Ethan", "George", "Ivan",
        "Kevin", "Michael", "Oliver", "Quinn", "Thomas",
        "Adam", "Daniel", "Liam", "Noah", "Jack",
        "Lucas", "Alexander", "Ryan", "Nathan", "Victor"
    };

    private static List<string> femaleNames = new()
    {
        "Alice", "Diana", "Fiona", "Hannah", "Julia",
        "Laura", "Nina", "Paula", "Riley", "Sophia",
        "Emma", "Mia", "Amelia", "Olivia", "Lily",
        "Chloe", "Grace", "Zoe", "Isabella", "Eva"
    };

    private static string GetRandomMaleImage()
    {
        // Generate a random number between 0 and 99
        int randomIndex = Random.Next(0, 100);
        return $"https://randomuser.me/api/portraits/men/{randomIndex}.jpg";
    }

    private static string GetRandomFemaleImage()
    {
        // Generate a random number between 0 and 99
        int randomIndex = Random.Next(0, 100);
        return $"https://randomuser.me/api/portraits/women/{randomIndex}.jpg";
    }
}