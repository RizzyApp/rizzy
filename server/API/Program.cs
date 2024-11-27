using System.Security.Claims;
using System.Text;
using API.Data;
using API.Data.Repositories;
using API.Hubs;
using API.Services;
using API.Services.Authentication;
using API.Services.ImageUpload;
using API.Services.SignalR;
using API.Utils.Configuration;
using API.Utils.Exceptions;
using API.Utils.Filters;
using CloudinaryDotNet;
using dotenv.net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

DotEnv.Load();


var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();


// Add services to the container.
AddServices();
ConfigureSwagger();
AddDbContexts();
AddAuthentication();
AddIdentity();
AddCors();


var app = builder.Build();

app.UseExceptionHandler();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    .Replace("{ServerName}", Environment.GetEnvironmentVariable("DB_SERVER") ?? "localhost")
    .Replace("{UserName}", Environment.GetEnvironmentVariable("DB_USER") ?? "sa")
    .Replace("{Password}", Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "veryStrongRizzyPassword123");
Console.WriteLine($"Connection String: {connectionString}");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseDeveloperExceptionPage();
    

    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var authenticationSeeder = scope.ServiceProvider.GetRequiredService<AuthenticationSeeder>();
        var appDBSeeder = scope.ServiceProvider.GetRequiredService<AppDbSeeder>();
        dbContext.Database.Migrate();
        authenticationSeeder.AddRoles();
        await appDBSeeder.SeedDataAsync(dbContext, userManager);

        authenticationSeeder.AddAdmin();
    }
}

app.UseCors("CorsPolicy");


app.UseAuthentication();
app.UseAuthorization();

app.MapHub<NotificationHub>("api/notificationHub");
app.MapHub<ChatHub>("api/chatHub");
app.MapControllers();
app.Run();


void AddServices()
{
    builder.Services.AddEndpointsApiExplorer();

    builder.Services.AddControllers();


    builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
    builder.Services.AddScoped<AuthenticationSeeder>();
    builder.Services.AddScoped<AppDbSeeder>();
    builder.Services.AddScoped<ICloudinaryService, CloudinaryService>(provider =>
    {
        var cloudinaryUrl = Environment.GetEnvironmentVariable("CLOUDINARY_URL")
                            ?? throw new InvalidOperationException("Cloudinary URL not configured.");
        Cloudinary cloudinary = new Cloudinary(cloudinaryUrl);
        return new CloudinaryService(cloudinary);
    });
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<IImageValidationService, ImageValidationService>();
    builder.Services.AddScoped<IImageService, ImageService>();
    builder.Services.AddScoped<IMatchService, MatchService>();
    builder.Services.AddScoped<IMessageService, MessageService>();
    builder.Services.Configure<RoleSettings>(builder.Configuration.GetSection("Roles"));

    builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    builder.Services.AddProblemDetails();
    builder.Services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();
    builder.Services.AddSignalR(options =>
    {
        var environment = builder.Environment;

        if (environment.IsDevelopment())
        {
            options.EnableDetailedErrors = true;
        }
        
    });
}

void ConfigureSwagger()
{
    builder.Services.AddSwaggerGen(option =>
    {
        option.SwaggerDoc("v1",
            new OpenApiInfo { Title = "Rizzy API", Version = "v1" });
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter a valid token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "Bearer"
        });
        option.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] { }
            }
        });
        option.DocumentFilter<LowercasePathFilter>();
    });
}

void AddDbContexts()
{
    builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    });
}

void AddAuthentication()
{
    var jwtSettings = builder.Configuration.GetSection("Authentication");

    builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ClockSkew = TimeSpan.Zero,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings["ValidIssuer"],
                ValidAudience = jwtSettings["ValidAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtSettings["IssuerSigningKey"])
                ),
            };
        })
        .AddCookie(IdentityConstants.ApplicationScheme, options =>
        {
            options.LoginPath = "/login";
            options.ExpireTimeSpan = TimeSpan.FromHours(1);
            options.SlidingExpiration = true;
            options.Cookie.HttpOnly = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.SameSite = SameSiteMode.None;
        });

    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("HasNameIdentifier", policy => policy.RequireClaim(ClaimTypes.NameIdentifier));
    });
}

void AddIdentity()
{
    builder.Services.AddIdentityCore<IdentityUser>(options =>
        {
            options.SignIn.RequireConfirmedAccount = false;
            options.User.RequireUniqueEmail = true;
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 8;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
        })
        .AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<AppDbContext>()
        .AddSignInManager();
}

void AddCors()
{
    var corsSettings = builder.Configuration.GetSection("CorsSettings").Get<CorsSettings>();
    
    Console.WriteLine("CorsSetting: " + corsSettings.AllowedOrigin);
    if (corsSettings is null)
    {
        throw new InvalidOperationException("Cors settings is missing from appsettings");
    }
    
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy", policy =>
        {
            policy.WithOrigins(corsSettings.AllowedOrigin)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });
}
