using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project3.IServices;
using Project3.Models;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderWeightController : ControllerBase
    {
        private readonly IOrderWeightRepo _orderWeightRepo;

        public OrderWeightController(IOrderWeightRepo orderWeightRepo)
        {
            _orderWeightRepo = orderWeightRepo;
        }

        [HttpPost("OrderWeightForm")]
        public async Task<IActionResult> PostOrderQuantity(OrderWeight orderWeight)
        {
            try
            {
                if (string.IsNullOrEmpty(orderWeight.CustomerName) ||
                    string.IsNullOrEmpty(orderWeight.CustomerPhone) ||
                    string.IsNullOrEmpty(orderWeight.CustomerEmail))

                {
                    return BadRequest("Customer information is required.");
                }

                OrderWeight result = await _orderWeightRepo.AddOrderWeight(orderWeight);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
        [HttpGet("OrderWeightList")]
        public async Task<IActionResult> GetAllOrderWeight()
        {
            try
            {
                var orderWeights = await _orderWeightRepo.GetAllOrderWeight();
                return Ok(orderWeights);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
