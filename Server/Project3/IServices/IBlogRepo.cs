using System.Collections.Generic;
using System.Threading.Tasks;
using Project3.Models;

namespace Project3.IServices
{
    public interface IBlogRepo
    {
        Task<IEnumerable<BlogPost>> GetAllBlogPosts();
        Task<BlogPost> GetBlogPostById(int blogPostId);
        Task<int> AddBlogPost(BlogPost blogPost);
        Task<int> UpdateBlogPost(BlogPost blogPost);
        Task<int> DeleteBlogPost(int blogPostId);
        Task<IEnumerable<BlogPost>> SearchPosts(string keyword);
    }
}
