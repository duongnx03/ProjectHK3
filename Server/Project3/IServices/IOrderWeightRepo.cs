using Project3.Models;

namespace Project3.IServices
{
    public interface IOrderWeightRepo
    {
        Task<OrderWeight> AddOrderWeight(OrderWeight orderWeight);
        Task<List<OrderWeight>> GetAllOrderWeight();
    }
}
