using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.IServices;
using Project3.Models;

namespace Project3.Services
{
    public class MembershipRepo : IMembershipRepo
    {
        private readonly DatabaseContext _dbContext;

        public MembershipRepo(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IEnumerable<Membership>> GetAllMemberships()
        {
            return await _dbContext.Membership.ToListAsync();
        }

        public async Task<Membership> GetMembershipById(int id)
        {
            return await _dbContext.Membership.FindAsync(id);
        }

        public async Task<bool> AddMembership(Membership membership)
        {
            if (await _dbContext.Membership.AnyAsync(m => m.Email == membership.Email))
            {
                return false; // Email đã tồn tại
            }

            membership.Weight = 40; // Cố định trọng lượng
            membership.ExpirationDate = membership.DateReigsterMembership.AddDays(30); // Tính ngày hết hạn

            _dbContext.Membership.Add(membership);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateMembership(Membership membership)
        {
            _dbContext.Entry(membership).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteMembership(int id)
        {
            var membership = await _dbContext.Membership.FindAsync(id);
            if (membership == null)
                return false;

            _dbContext.Membership.Remove(membership);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RenewMembershipByEmail(string email)
        {
            var membership = await _dbContext.Membership.FirstOrDefaultAsync(m => m.Email == email);
            if (membership == null)
                return false;

            membership.Weight += 40; 

            membership.ExpirationDate = membership.ExpirationDate.AddDays(30);

            await _dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> OrderMembership(int membershipId, int weightOrdered)
        {
            var membership = await _dbContext.Membership.FindAsync(membershipId);
            if (membership == null)
                return false;

            // Kiểm tra trọng lượng đặt hàng có vượt quá giới hạn không
            if (weightOrdered > 10 || weightOrdered <= 0 || membership.Weight < weightOrdered)
                return false;

            // Giảm trọng lượng của Membership
            membership.Weight -= weightOrdered;

            // Nếu trọng lượng giảm xuống 0, thông báo không thể đặt hàng nữa
            if (membership.Weight == 0)
            {
                return false;
            }

            await _dbContext.SaveChangesAsync();
            return true;
        }
    }

}

