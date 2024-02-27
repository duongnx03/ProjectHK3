using System.ComponentModel.DataAnnotations;

namespace Project3.Models
{
    public class UserLogin
    {
        [Required(ErrorMessage = "Username cannot blank!")]
        [MaxLength(50)]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password cannot blank!")]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}
