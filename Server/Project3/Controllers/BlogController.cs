using System;
using Microsoft.AspNetCore.Http;
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
            _blogRepo = blogRepo;
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
                    return NotFound();
                }
                return Ok(blogPost);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddBlogPost([FromForm] BlogPost blogPost, IFormFile image)
        {
            try
            {
                var id = await _blogRepo.AddBlogPost(blogPost, image);
                return CreatedAtAction(nameof(GetBlogPostById), new { id }, blogPost);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlogPost(int id, [FromForm] BlogPost blogPost, IFormFile image)
        {
            try
            {
                if (id != blogPost.BlogPostId)
                {
                    return BadRequest("BlogPostId mismatch");
                }

                await _blogRepo.UpdateBlogPost(blogPost, image);
                return NoContent();
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
                var deletedId = await _blogRepo.DeleteBlogPost(id);
                if (deletedId == -1)
                {
                    return NotFound();
                }
                return Ok(deletedId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchBlogPosts(string keyword)
        {
            try
            {
                var searchResult = await _blogRepo.SearchPosts(keyword);
                return Ok(searchResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
