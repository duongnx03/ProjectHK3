using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.Models;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Project3.Hubs
{
    public class BanUserHub : Hub
    {
        private readonly DatabaseContext db;

        public BanUserHub(DatabaseContext db)
        {
            this.db = db;
        }


        public override async Task OnConnectedAsync()
        {
            string connectionId = Context.ConnectionId;

            // Lấy UserId từ claim "UserId" trong token
            var userIdClaim = Context.User.FindFirst("UserId");
            if (userIdClaim != null)
            {
                var userId = int.Parse(userIdClaim.Value);

                // Lưu thông tin kết nối vào cơ sở dữ liệu
                var userConnection = new UserConnection { UserId = userId, ConnectionId = connectionId };
                db.UserConnections.Add(userConnection);
                await db.SaveChangesAsync();
            }

            await base.OnConnectedAsync();
        }

        [Authorize]
        public async Task NotifyUserBanned()
        {
            await Clients.All.SendAsync("UserBanned");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string connectionIdToRemove = Context.ConnectionId;

            // Tìm thông tin kết nối tương ứng với connectionId và xóa nó khỏi cơ sở dữ liệu
            var userConnection = await db.UserConnections.FirstOrDefaultAsync(x => x.ConnectionId == connectionIdToRemove);
            if (userConnection != null)
            {
                db.UserConnections.Remove(userConnection);
                await db.SaveChangesAsync();
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
}
