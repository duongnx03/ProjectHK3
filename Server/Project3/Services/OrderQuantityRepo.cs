using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.IServices;
using Project3.Models;
using System.Net.Mail;
using System.Net;

namespace Project3.Services
{
    public class OrderQuantityRepo : IOrderQuantityRepo
    {
        private readonly DatabaseContext _dbContext;

        public OrderQuantityRepo(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<OrderQuantity> AddOrderQuantity(OrderQuantity orderQuantity)
        {
            // Kiểm tra xem trọng lượng đặt hàng có khác 0 không
            if (orderQuantity.Quantity <= 0)
            {
                throw new Exception("Order weight must be greater than 0.");
            }
            const int TimePerUnit = 60;

            int totalMinutes = orderQuantity.Quantity * TimePerUnit;

            orderQuantity.WashTime = DateTime.Now;
            orderQuantity.TimeToFinishWashing = orderQuantity.WashTime.AddMinutes(totalMinutes);

            _dbContext.OrderQuantitys.Add(orderQuantity);
            await _dbContext.SaveChangesAsync();

            await SendOrderConfirmationEmail(orderQuantity.CustomerEmail);

            return orderQuantity;
        }
        public async Task<List<OrderQuantity>> GetAllOrderQuantities()
        {
            return await _dbContext.OrderQuantitys.ToListAsync();
        }

        public async Task<OrderQuantity> GetOrderQuantityById(int id)
        {
            return await _dbContext.OrderQuantitys.FindAsync(id);
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
    }
}
