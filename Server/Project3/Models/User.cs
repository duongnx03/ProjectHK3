using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Project3.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required(ErrorMessage = "Username cannot blank!")]
        [MaxLength(50)]
        [RegularExpression("^[a-zA-Z0-9]+$", ErrorMessage = "Username must only contain letters and numbers.")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Fullname cannot blank!")]
        [MaxLength(50)]
        [RegularExpression("^[a-zA-Z ]+$", ErrorMessage = "Fullname must only contain letters.")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Email cannot blank!")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password cannot be blank!")]
        [MinLength(6, ErrorMessage = "Password must have at least 6 characters.")]
        [StringLength(256)]
        [RegularExpression(@"^(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$",ErrorMessage = "Password must contain at least one special character.")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Address cannot blank!")]
        [MaxLength(250)]
        [RegularExpression("^[a-zA-Z0-9 /,\\-]+$", ErrorMessage = "Address must only contain letters and numbers.")]
        public string Address { get; set; }
        [Required(ErrorMessage = "Phone cannot blank!")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "The phone number must have exactly 10 digits.")]
        public string Phone { get; set; }
        public string? Role { get; set; }
        public string? Membership { get; set; }
        [DisplayFormat(DataFormatString = "{yyyy-MM-dd HH:mm:ss}", ApplyFormatInEditMode = true)]
        public DateTime RegisterTime { get; set; } 
        public string? Avatar { get; set; }
        public bool? IsConfirmed { get; set; }
        public string? ConfirmationCode { get; set; }
        public DateTime? ConfirmationCodeExpires { get; set; }
        public string? ConfirmationCodeToken { get; set; }
        public bool isBan { get; set; }
        public string? isOnline { get; set; }
        public string? ConnectionId { get; set; }
        public DateTime LastActivity {  get; set; }
    }
}
