using Project3.Models;

namespace Project3.IServices
{
    public interface IMembershipRepo
    {
        Task<IEnumerable<Membership>> GetAllMemberships();
        Task<Membership> GetMembershipById(int id);
        Task<bool> AddMembership(Membership membership);
        Task<bool> DeleteMembership(int id);
        Task<bool> RenewMembershipByEmail(string email);
        Task<bool> OrderMembership(int membershipId, int weightOrdered);


    }
}
