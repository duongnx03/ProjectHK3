using Microsoft.EntityFrameworkCore;
using Project3.Models;
using BCrypt.Net;

namespace Project3.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserConnection> UserConnections { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(u =>
            {
                u.Property("UserId").ValueGeneratedOnAdd().UseIdentityColumn();
                u.HasKey("UserId");
                u.HasData(new User[]
                {
                    new User {UserId = 1, UserName="admin", FullName="Online Laundry", Email="onlinelaundry.126@gmail.com", Address="HCM", Password=BCrypt.Net.BCrypt.HashPassword("123@123"), RegisterTime=DateTime.Now, Role="Admin", Phone="0123456789", isOnline = "Online"}
                });
            });
        }
    }
}