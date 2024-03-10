using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project3.IServices;
using Project3.Models;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderQuantityController : ControllerBase
    {
        private readonly IOrderQuantityRepo _orderQuantityRepo;

        public OrderQuantityController(IOrderQuantityRepo orderQuantityRepo)
        {
            _orderQuantityRepo = orderQuantityRepo;
        }

        [HttpPost("OrderQuantityForm")] 
        public async Task<IActionResult> PostOrderQuantity(OrderQuantity orderQuantity)
        {
            try
            {
                if (string.IsNullOrEmpty(orderQuantity.CustomerName) ||
                    string.IsNullOrEmpty(orderQuantity.CustomerPhone) ||
                    string.IsNullOrEmpty(orderQuantity.CustomerEmail))
                    
                {
                    return BadRequest("Customer information is required.");
                }

                OrderQuantity result = await _orderQuantityRepo.AddOrderQuantity(orderQuantity);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
        [HttpGet("OrderQuantityList")]
        public async Task<IActionResult> GetAllOrderQuantity()
        {
            try
            {
                var orderQuantities = await _orderQuantityRepo.GetAllOrderQuantities();
                return Ok(orderQuantities);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("{id}")] // Endpoint để lấy OrderQuantity theo Id
        public async Task<IActionResult> GetOrderQuantityById(int id)
        {
            try
            {
                var orderQuantity = await _orderQuantityRepo.GetOrderQuantityById(id);
                if (orderQuantity == null)
                {
                    return NotFound();
                }
                return Ok(orderQuantity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
