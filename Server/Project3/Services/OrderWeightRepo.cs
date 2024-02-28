using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.IServices;
using Project3.Models;

namespace Project3.Services
{
    public class OrderWeightRepo : IOrderWeightRepo
    {
        private readonly DatabaseContext _dbContext;

        public OrderWeightRepo(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<OrderWeight> AddOrderWeight(OrderWeight orderWeight)
        {

            const int TimePerUnit = 60;


            int totalMinutes = orderWeight.Weight * TimePerUnit;

            orderWeight.WashTime = DateTime.Now;


            orderWeight.TimeToFinishWashing = orderWeight.WashTime.AddMinutes(totalMinutes);

            _dbContext.OrderWeights.Add(orderWeight);
            await _dbContext.SaveChangesAsync();

            return orderWeight;
        }
        public async Task<List<OrderWeight>> GetAllOrderWeight()
        {
            return await _dbContext.OrderWeights.ToListAsync();
        }
    }
}
