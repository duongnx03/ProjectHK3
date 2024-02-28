using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project3.IServices;
using Project3.Models;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepo _productRepo;

        public ProductController(IProductRepo productRepo)
        {
            _productRepo = productRepo;
        }
        [HttpGet("getallproduct")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var products = await _productRepo.GetAllProducts();
            return Ok(products);
        }

        // GET: api/Product/5
        [HttpGet("getproductbyid/{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _productRepo.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST: api/Product
        [HttpPost("addproduct")]
        public async Task<ActionResult<string>> AddProduct(Product product)
        {
            try
            {
                var result = await _productRepo.AddProduct(product);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Product/5
        [HttpPut("editproduct/{id}")]
        public async Task<ActionResult<string>> EditProduct(int id, Product product)
        {
            try
            {
                var result = await _productRepo.EditProduct(id, product);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Product/5
        [HttpDelete("deleteproduct/{id}")]
        public async Task<ActionResult<string>> DeleteProduct(int id)
        {
            try
            {
                var result = await _productRepo.DeleteProduct(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
