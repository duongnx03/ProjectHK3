using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.IServices;
using Project3.Models;

namespace Project3.Services
{
    public class BlogRepo : IBlogRepo
    {
        private readonly DatabaseContext _context;
        private readonly IWebHostEnvironment _environment;

        public BlogRepo(DatabaseContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPosts()
        {
            try
            {
                return await _context.BlogPosts.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while retrieving blog posts", ex);
            }
        }

        public async Task<BlogPost> GetBlogPostById(int blogPostId)
        {
            try
            {
                return await _context.BlogPosts.FindAsync(blogPostId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occurred while retrieving blog post with ID {blogPostId}", ex);
            }
        }

        public async Task<int> AddBlogPost(BlogPost blogPost, IFormFile image)
        {
            try
            {
                if (image != null && image.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_environment.WebRootPath, "images");
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    blogPost.ImageUrl = "/images/" + fileName;
                }

                _context.BlogPosts.Add(blogPost);
                await _context.SaveChangesAsync();
                return blogPost.BlogPostId;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while adding blog post", ex);
            }
        }

        public async Task<int> UpdateBlogPost(BlogPost blogPost, IFormFile image)
        {
            try
            {
                _context.Entry(blogPost).State = EntityState.Modified;

                if (image != null && image.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_environment.WebRootPath, "images");
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    blogPost.ImageUrl = "/images/" + fileName;
                }

                await _context.SaveChangesAsync();
                return blogPost.BlogPostId;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occurred while updating blog post with ID {blogPost.BlogPostId}", ex);
            }
        }

        public async Task<int> DeleteBlogPost(int blogPostId)
        {
            try
            {
                var blogPost = await _context.BlogPosts.FindAsync(blogPostId);
                if (blogPost != null)
                {
                    _context.BlogPosts.Remove(blogPost);
                    await _context.SaveChangesAsync();
                    return blogPostId;
                }
                return -1; // Hoặc một giá trị khác đại diện cho việc không tìm thấy bài đăng
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occurred while deleting blog post with ID {blogPostId}", ex);
            }
        }

        public async Task<IEnumerable<BlogPost>> SearchPosts(string keyword)
        {
            try
            {
                return await _context.BlogPosts
                    .Where(post => post.Title.Contains(keyword) || post.Content.Contains(keyword) || post.Author.Contains(keyword))
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while searching for blog posts", ex);
            }
        }
    }
}
