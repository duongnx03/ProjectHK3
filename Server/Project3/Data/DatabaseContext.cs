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
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderWeight> OrderWeights { get; set; }
        public DbSet<OrderQuantity> OrderQuantitys { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }

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

            modelBuilder.Entity<BlogPost>().HasData(
                       new BlogPost
                       {
                           BlogPostId = 1,
                           Title = "First Blog Post",
                           Content = "This is the content of the first blog post.",
                           Author = "John Doe",
                           DatePublished = DateTime.UtcNow.AddDays(-7), // Published 7 days ago
                           ImageUrl = "sample.jpg"
                       },
                       new BlogPost
                       {
                           BlogPostId = 2,
                           Title = "Second Blog Post",
                           Content = "This is the content of the second blog post.",
                           Author = "Jane Doe",
                           DatePublished = DateTime.UtcNow.AddDays(-5), // Published 5 days ago
                           ImageUrl = "sample.jpg"
                       });
                      modelBuilder.Entity<Product>().HasData(new Product[]
                      { 
                          new Product {ProductId=1, ProductName="Washing by Kilograms", ProductDescription="The amount that you have to pay should be based on your kilograms"}
                      });     
        }
    }
}
