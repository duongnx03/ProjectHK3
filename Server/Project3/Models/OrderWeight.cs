namespace Project3.Models
{
    public class OrderWeight
    {
        public int OrderWeightId { get; set; }

        public int ProductId { get; set; }

        public int Weight { get; set; }

        public DateTime WashTime { get; set; }

        public DateTime TimeToFinishWashing { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
    }
}
