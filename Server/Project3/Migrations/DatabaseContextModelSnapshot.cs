﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Project3.Data;

#nullable disable

namespace Project3.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Project3.Models.BlogPost", b =>
                {
                    b.Property<int>("BlogPostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BlogPostId"));

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(5000)
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DatePublished")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("BlogPostId");

                    b.ToTable("BlogPosts");

                    b.HasData(
                        new
                        {
                            BlogPostId = 1,
                            Author = "John Doe",
                            Content = "This is the content of the first blog post.",
                            DatePublished = new DateTime(2024, 2, 20, 16, 50, 41, 878, DateTimeKind.Utc).AddTicks(6330),
                            ImageUrl = "sample.jpg",
                            Title = "First Blog Post"
                        },
                        new
                        {
                            BlogPostId = 2,
                            Author = "Jane Doe",
                            Content = "This is the content of the second blog post.",
                            DatePublished = new DateTime(2024, 2, 22, 16, 50, 41, 878, DateTimeKind.Utc).AddTicks(6340),
                            ImageUrl = "sample.jpg",
                            Title = "Second Blog Post"
                        });
                });

            modelBuilder.Entity("Project3.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConfirmationCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ConfirmationCodeExpires")
                        .HasColumnType("datetime2");

                    b.Property<string>("ConfirmationCodeToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConnectionId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool?>("IsConfirmed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("LastActivity")
                        .HasColumnType("datetime2");

                    b.Property<string>("Membership")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RegisterTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("isBan")
                        .HasColumnType("bit");

                    b.Property<string>("isOnline")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Address = "HCM",
                            Email = "onlinelaundry.126@gmail.com",
                            FullName = "Online Laundry",
                            LastActivity = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Password = "$2a$11$sw2gRv5s/a30iP99bb/KquheqwpSJfNZW7mrEJD1bBuLTsEgZD/N.",
                            Phone = "0123456789",
                            RegisterTime = new DateTime(2024, 2, 27, 23, 50, 41, 878, DateTimeKind.Local).AddTicks(5460),
                            Role = "Admin",
                            UserName = "admin",
                            isBan = false,
                            isOnline = "Online"
                        });
                });

            modelBuilder.Entity("Project3.Models.UserConnection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ConnectionId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("UserConnections");
                });
#pragma warning restore 612, 618
        }
    }
}
