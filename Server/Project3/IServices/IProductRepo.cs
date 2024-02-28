using Project3.Data;
using Project3.Models;

namespace Project3.IServices
{
    public interface IProductRepo 
    {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<string> AddProduct(Product product);
        Task<string> EditProduct(int id, Product product);
        Task<string> DeleteProduct(int id);
    }
} 