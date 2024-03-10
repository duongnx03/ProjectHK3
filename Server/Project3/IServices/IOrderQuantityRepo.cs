using Project3.Models;

namespace Project3.IServices
{
    public interface IOrderQuantityRepo
    {
        Task<OrderQuantity> AddOrderQuantity(OrderQuantity orderQuantity);
        Task<List<OrderQuantity>> GetAllOrderQuantities();
        Task<OrderQuantity> GetOrderQuantityById(int id);
    }
}
