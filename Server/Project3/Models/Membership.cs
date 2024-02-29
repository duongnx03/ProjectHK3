using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Runtime.ConstrainedExecution;

namespace Project3.Models
{
    public class Membership
    {
        [Key]
        public int MembershipId { get; set; }

        public string CustomerName { get; set; }

        public string Email {  get; set; }

        public int Phone {  get; set; }

        public int Weight { get; set; }

        public DateTime DateReigsterMembership { get; set; }

        public DateTime ExpirationDate { get; set; }
    } 
}
