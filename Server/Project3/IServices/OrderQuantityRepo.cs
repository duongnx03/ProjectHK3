using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.IServices;
using Project3.Models;

namespace Project3.Services
{
    public class OrderQuantityRepo : IOrderQuantityRepo
    {
        private  readonly DatabaseContext _dbContext;

        public OrderQuantityRepo(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<OrderQuantity> AddOrderQuantity(OrderQuantity orderQuantity)
        {
           
            const int TimePerUnit = 60; 

         
            int totalMinutes = orderQuantity.Quantity * TimePerUnit;

            orderQuantity.WashTime = DateTime.Now;

      
            orderQuantity.TimeToFinishWashing = orderQuantity.WashTime.AddMinutes(totalMinutes);

            _dbContext.OrderQuantitys.Add(orderQuantity);
            await _dbContext.SaveChangesAsync();

            return orderQuantity;
        }
        public async Task<List<OrderQuantity>> GetAllOrderQuantities()
        {
            return await _dbContext.OrderQuantitys.ToListAsync();
        }
    }
}
