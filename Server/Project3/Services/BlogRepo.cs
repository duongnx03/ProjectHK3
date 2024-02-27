using System;
using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.IServices;
using Project3.Models;

namespace Project3.Services
{
	public class BlogRepo : IBlogRepo	{
        private readonly DatabaseContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BlogRepo(DatabaseContext context, IWebHostEnvironment webHostEnvironment)
        {
            this._context = context;
            this._webHostEnvironment = webHostEnvironment;

        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPosts()
        {
            try
            {
                return await _context.BlogPosts.ToListAsync();
            }
            catch (Exception ex)
            {
                HandleException(ex, "Error getting all blog posts");
                return null;
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
                HandleException(ex, "Error getting blog post by ID");
                return null;
            }
        }

        public async Task<int> AddBlogPost(BlogPost blogPost)
        {
            try
            {
                // Xử lý upload ảnh
                if (blogPost.UploadFile != null)
                {
                    blogPost.ImageUrl = await UploadImage(blogPost.UploadFile);
                }

                _context.BlogPosts.Add(blogPost);
                await _context.SaveChangesAsync();
                return blogPost.BlogPostId;
            }
            catch (Exception ex)
            {
                HandleException(ex, "Error adding blog post");
                return 0;
            }
        }

        public async Task<int> UpdateBlogPost(BlogPost blogPost)
        {
            try
            {
                var existingPost = await GetBlogPostById(blogPost.BlogPostId);

                if (existingPost == null)
                {
                    return 0;
                    throw new InvalidOperationException("Blog post not found");
                }

                // Xử lý upload ảnh
                if (blogPost.UploadFile != null)
                {
                    existingPost.ImageUrl = await UploadImage(blogPost.UploadFile);
                }

                existingPost.Title = blogPost.Title;
                existingPost.Content = blogPost.Content;
                existingPost.Author = blogPost.Author;
                existingPost.DatePublished = blogPost.DatePublished;

                await _context.SaveChangesAsync();
                return existingPost.BlogPostId;
            }
            catch (Exception ex)
            {
                HandleException(ex, "Error updating blog post");
                return 0;
            }
        }

        public async Task<int> DeleteBlogPost(int blogPostId)
        {
            try
            {
                var blogPost = await _context.BlogPosts.FindAsync(blogPostId);

                if (blogPost == null)
                {
                    throw new InvalidOperationException("Blog post not found");
                }

                _context.BlogPosts.Remove(blogPost);
                await _context.SaveChangesAsync();
                return blogPostId;
            }
            catch (Exception ex)
            {
                HandleException(ex, "Error deleting blog post");
                return 0;
            }
        }

        private async Task<string> UploadImage(IFormFile file)
        {
            try
            {
                // Lấy đường dẫn thư mục wwwroot/images bằng cách sử dụng IWebHostEnvironment
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                // Trả về URL
                return $"/images/{uniqueFileName}";
            }
            catch (Exception ex)
            {
                throw new Exception("Error uploading image", ex);
            }
        }

        private void HandleException(Exception ex, string message)
        {
            Console.WriteLine($"{message}: {ex.Message}");
        }
    }
}

