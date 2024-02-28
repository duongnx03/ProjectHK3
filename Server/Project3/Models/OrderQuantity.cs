namespace Project3.Models
{
    public class OrderQuantity
    {
        public int OrderQuantityId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public DateTime WashTime { get; set; }

        public DateTime TimeToFinishWashing { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
    }
}
