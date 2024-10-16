﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241016165514_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("API.Models.BlockedUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BlockedUserId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BlockedUserId");

                    b.HasIndex("UserId");

                    b.ToTable("BlockedUsers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BlockedUserId = 2,
                            UserId = 1
                        });
                });

            modelBuilder.Entity("API.Models.MatchInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("MatchInfos");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2024, 10, 16, 18, 55, 13, 973, DateTimeKind.Local).AddTicks(1626)
                        });
                });

            modelBuilder.Entity("API.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("MatchInfoId")
                        .HasColumnType("int");

                    b.Property<string>("MessageText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("SentMessageAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MatchInfoId");

                    b.HasIndex("UserId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Photos");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Url = "https://shorturl.at/MXkRc",
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            Url = "https://shorturl.at/MXkRc",
                            UserId = 2
                        });
                });

            modelBuilder.Entity("API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<DateTime?>("LastActivityDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MiddleName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Verified")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Bio = "Developer",
                            BirthDate = new DateTime(1990, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            CreatedAt = new DateTime(2024, 10, 16, 18, 55, 13, 973, DateTimeKind.Local).AddTicks(1413),
                            FirstName = "Pista",
                            Gender = 1,
                            LastName = "Erős",
                            Verified = true
                        },
                        new
                        {
                            Id = 2,
                            Bio = "Designer",
                            BirthDate = new DateTime(1995, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            CreatedAt = new DateTime(2024, 10, 16, 18, 55, 13, 973, DateTimeKind.Local).AddTicks(1460),
                            FirstName = "Anna",
                            Gender = 2,
                            LastName = "Gyenge",
                            Verified = false
                        });
                });

            modelBuilder.Entity("API.Models.UserLocations", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Latitude")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Longitude")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("UserLocations");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Latitude = 47.497913m,
                            Longitude = 19.040236m
                        },
                        new
                        {
                            Id = 2,
                            Latitude = 47.497913m,
                            Longitude = 19.040236m
                        });
                });

            modelBuilder.Entity("API.Models.UserLoginDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Password")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserLoginDetails");
                });

            modelBuilder.Entity("API.Models.UserMatchInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("MatchInfoId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MatchInfoId");

                    b.HasIndex("UserId");

                    b.ToTable("UserMatchInfos");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            MatchInfoId = 1,
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            MatchInfoId = 1,
                            UserId = 2
                        });
                });

            modelBuilder.Entity("UserUserLocations", b =>
                {
                    b.Property<int>("UserLocationsId")
                        .HasColumnType("int");

                    b.Property<int>("UsersId")
                        .HasColumnType("int");

                    b.HasKey("UserLocationsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("UserUserLocations");
                });

            modelBuilder.Entity("API.Models.BlockedUser", b =>
                {
                    b.HasOne("API.Models.User", "BlockedUserNavigation")
                        .WithMany()
                        .HasForeignKey("BlockedUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("API.Models.User", "User")
                        .WithMany("BlockedUsers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("BlockedUserNavigation");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.Message", b =>
                {
                    b.HasOne("API.Models.MatchInfo", "MatchInfo")
                        .WithMany("Messages")
                        .HasForeignKey("MatchInfoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.User", "User")
                        .WithMany("Messages")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MatchInfo");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.Photo", b =>
                {
                    b.HasOne("API.Models.User", "User")
                        .WithMany("Photos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.UserLoginDetail", b =>
                {
                    b.HasOne("API.Models.User", "User")
                        .WithMany("UserLoginDetails")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.UserMatchInfo", b =>
                {
                    b.HasOne("API.Models.MatchInfo", "MatchInfo")
                        .WithMany("UserMatchInfos")
                        .HasForeignKey("MatchInfoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.User", "User")
                        .WithMany("UserMatchInfos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MatchInfo");

                    b.Navigation("User");
                });

            modelBuilder.Entity("UserUserLocations", b =>
                {
                    b.HasOne("API.Models.UserLocations", null)
                        .WithMany()
                        .HasForeignKey("UserLocationsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API.Models.MatchInfo", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("UserMatchInfos");
                });

            modelBuilder.Entity("API.Models.User", b =>
                {
                    b.Navigation("BlockedUsers");

                    b.Navigation("Messages");

                    b.Navigation("Photos");

                    b.Navigation("UserLoginDetails");

                    b.Navigation("UserMatchInfos");
                });
#pragma warning restore 612, 618
        }
    }
}
