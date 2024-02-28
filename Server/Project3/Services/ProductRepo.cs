using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Project3.Data;
using Project3.IServices;
using Project3.Models;

namespace Project3.Services
{
    public class ProductRepo : IProductRepo
    {
        private readonly DatabaseContext _dbContext;
        public ProductRepo(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _dbContext.Products.ToListAsync();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _dbContext.Products.FindAsync(id);
        }

        public async Task<string> AddProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }

            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync();
            return "Product added successfully.";
        }

        public async Task<string> EditProduct(int id, Product product)
        {
            var existingProduct = await _dbContext.Products.FindAsync(id);
            if (existingProduct == null)
            {
                throw new InvalidOperationException("Product not found.");
            }

            existingProduct.ProductName = product.ProductName;
            existingProduct.ProductDescription = product.ProductDescription;

            await _dbContext.SaveChangesAsync();
            return "Product updated successfully.";
        }

        public async Task<string> DeleteProduct(int id)
        {
            var product = await _dbContext.Products.FindAsync(id);
            if (product == null)
            {
                throw new InvalidOperationException("Product not found.");
            }

            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();
            return "Product deleted successfully.";
        }
    }

}

