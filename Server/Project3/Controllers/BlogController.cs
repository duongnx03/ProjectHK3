using System;
using Microsoft.AspNetCore.Mvc;
using Project3.IServices;
using Project3.Models;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {

        private readonly IBlogRepo _blogRepo;

        public BlogController(IBlogRepo blogRepo)
        {
            this._blogRepo = blogRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
            try
            {
                var blogPosts = await _blogRepo.GetAllBlogPosts();
                return Ok(blogPosts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogPostById(int id)
        {
            try
            {
                var blogPost = await _blogRepo.GetBlogPostById(id);
                if (blogPost == null)
                {
                    return NotFound($"Blog post with id {id} not found");
                }
                return Ok(blogPost);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddBlogPost([FromForm] BlogPost blogPost)
        {
            try
            {
                // Kiểm tra các trường bắt buộc
                if (string.IsNullOrEmpty(blogPost.Title) || string.IsNullOrEmpty(blogPost.Content) || string.IsNullOrEmpty(blogPost.Author))
                {
                    return BadRequest("Title, Content, and Author are required fields.");
                }

                // Tiếp tục xử lý như bình thường
                var addedBlogPostId = await _blogRepo.AddBlogPost(blogPost);
                if (addedBlogPostId == 0)
                {
                    return BadRequest("Failed to add blog post");
                }

                // Trả về CreatedAtAction với thông tin về blog post vừa thêm vào
                return CreatedAtAction(nameof(GetBlogPostById), new { id = addedBlogPostId }, addedBlogPostId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlogPost(int id, [FromBody] BlogPost blogPost)
        {
            try
            {
                var existingBlogPostId = await _blogRepo.UpdateBlogPost(blogPost);
                if (existingBlogPostId == 0)
                {
                    return NotFound($"Blog post with id {id} not found");
                }

                return Ok(existingBlogPostId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPost(int id)
        {
            try
            {
                var deletedBlogPostId = await _blogRepo.DeleteBlogPost(id);
                if (deletedBlogPostId == 0)
                {
                    return NotFound($"Blog post with id {id} not found");
                }

                return Ok(deletedBlogPostId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

