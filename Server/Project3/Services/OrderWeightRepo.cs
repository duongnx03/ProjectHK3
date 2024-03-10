using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.IServices;
using Project3.Models;
using System.Net.Mail;
using System.Net;

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
            // Kiểm tra xem trọng lượng đặt hàng có khác 0 không
            if (orderWeight.Weight <= 0)
            {
                throw new Exception("Order weight must be greater than 0.");
            }

            const int TimePerUnit = 60;

            int totalMinutes = orderWeight.Weight * TimePerUnit;

            orderWeight.WashTime = DateTime.Now;
            orderWeight.TimeToFinishWashing = orderWeight.WashTime.AddMinutes(totalMinutes);

            _dbContext.OrderWeights.Add(orderWeight);
            await _dbContext.SaveChangesAsync();

            // Gửi email xác nhận đơn hàng
            await SendOrderConfirmationEmail(orderWeight.CustomerEmail);

            return orderWeight;
        }

        public Task<List<OrderWeight>> GetAllOrderWeight()
        {
            throw new NotImplementedException();
        }

        private async Task SendOrderConfirmationEmail(string toEmail)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("trinmts2210028@fpt.edu.vn");
                mail.To.Add(toEmail);
                mail.Subject = "Order Confirmation";
                mail.Body = "Thank you for your order. Your order has been successfully placed.";

                mail.IsBodyHtml = true;

                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com"))
                {
                    smtp.Port = 587;
                    smtp.Credentials = new NetworkCredential("trinmts2210028@fpt.edu.vn", "vjvv rmpx ajpv sqhl");
                    smtp.EnableSsl = true;
                    await smtp.SendMailAsync(mail);
                }
            }
        }

        public async Task<OrderWeight> GetOrderWeightById(int id)
        {
            return await _dbContext.OrderWeights.FindAsync(id);
        }
    }
}
