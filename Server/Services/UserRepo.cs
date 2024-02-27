using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Project3.Data;
using Project3.IServices;
using Project3.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using Org.BouncyCastle.Utilities.Net;

namespace Project3.Services
{
    public class UserRepo : IUserRepo
    {
        private readonly DatabaseContext db;
        private readonly IConfiguration configuration;

        public UserRepo(DatabaseContext db, IConfiguration configuration)
        {
            this.db = db;
            this.configuration = configuration;
        }

        // Phương thức xác thực
        public async Task<User> Authenticate(UserLogin userLogin)
        {
            try
            {
                var currentUser = await db.Users.SingleOrDefaultAsync(u => u.UserName.ToLower() == userLogin.UserName || u.Email.ToLower() == userLogin.UserName);
                if (currentUser != null && BCrypt.Net.BCrypt.Verify(userLogin.Password, currentUser.Password))
                {
                    currentUser.isOnline = "Online";
                    await db.SaveChangesAsync();
                    return currentUser;
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        // Phương thức xác nhận email
        public async Task<bool> ConfirmEmail(int userId, string confirmationCodeToken)
        {
            try
            {
                var user = await GetUserById(userId);

                if (user != null && user.ConfirmationCodeToken == confirmationCodeToken && user.ConfirmationCodeExpires > DateTime.Now)
                {
                    user.IsConfirmed = true;
                    user.ConfirmationCode = null;
                    user.ConfirmationCodeExpires = null;
                    user.ConfirmationCodeToken = null;

                    await db.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        // Phương thức tạo người dùng mới
        public async Task<string> CreateUser(User user)
        {
            try
            {
                if (await IsUserNameUnique(user.UserName))
                {
                    if (await IsEmailUnique(user.Email))
                    {
                        if(await IsPhoneUnique(user.Phone))
                        {
                            user.Role = "User";
                            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                            user.RegisterTime = DateTime.Now;
                            user.ConfirmationCode = GenerateRandomCode();
                            user.IsConfirmed = false;
                            user.ConfirmationCodeExpires = DateTime.Now.AddHours(24);
                            user.ConfirmationCodeToken = Guid.NewGuid().ToString();
                            user.isOnline = "Offline";
                            user.isBan = false;

                            db.Users.Add(user);
                            await db.SaveChangesAsync();

                            SendConfirmationEmail(user.Email, user.ConfirmationCodeToken);
                            return null;
                        }
                        else
                        {
                            return "Phone is already in use";
                        }
                    }
                    else
                    {
                        return "Email is already in use";
                    }
                }
                else
                {
                    return "Username is already in use";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        // Phương thức quên mật khẩu
        public async Task<User> ResetPassword(string username, string password, string code)
        {
            try
            {
                var user = await GetInfoForForgotPassword(username);
                if (user != null)
                {
                    if(user.ConfirmationCode == code)
                    {
                        user.ConfirmationCode = null;
                        user.Password = BCrypt.Net.BCrypt.HashPassword(password);
                        await db.SaveChangesAsync();
                        return user;
                    }
                    return null;
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        // Phương thức sinh token
        public async Task<string> GenerateToken(User user)
        {
            try
            {
                var securiryKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var credential = new SigningCredentials(securiryKey, SecurityAlgorithms.HmacSha256);
                var claims = new[]
                {
                    new Claim("UserId", user.UserId.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                };
                var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"], claims, expires: DateTime.Now.AddMinutes(50),
                    signingCredentials: credential);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch
            {
                return null;
            }
        }

        // Phương thức lấy danh sách tất cả người dùng
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            try
            {
                var listUser = await db.Users.Where(u => u.Role == "User").ToListAsync();
                return listUser;
            }
            catch
            {
                return null;
            }
        }

        // Phương thức lấy người dùng theo ID
        public async Task<User> GetUserById(int id)
        {
            try
            {
                var user = await db.Users.SingleOrDefaultAsync(u => u.UserId == id);
                return user;
            }
            catch
            {
                return null;
            }
        }

        // Phương thức tìm kiếm người dùng
        public async Task<IEnumerable<User>> SearchUser(string username)
        {
            try
            {
                var users = await db.Users.Where(u => u.UserName.Contains(username)).ToListAsync();
                return users;
            }
            catch
            {
                return null;
            }
        }

        // Phương thức tải ảnh đại diện
        public async Task<byte[]> GetAvatar(int userId)
        {
            try
            {
                var user = await GetUserById(userId);

                if (user != null && !string.IsNullOrEmpty(user.Avatar))
                {
                    var imagePath = Path.Combine("Images", user.Avatar);

                    if (System.IO.File.Exists(imagePath))
                    {
                        return await System.IO.File.ReadAllBytesAsync(imagePath);
                    }
                }

                return null;
            }
            catch
            {
                return null;
            }
        }

        // Phương thức chỉnh sửa thông tin
        public async Task<User> EditInfo(int id, string fullname, string address, string phone)
        {
            try
            {
                var user = await GetUserById(id);
                if (user != null)
                {
                    user.FullName = fullname;
                    user.Address = address;
                    user.Phone = phone;
                    db.Users.Update(user);
                    await db.SaveChangesAsync();
                }
                return user;
            }
            catch
            {
                return null;
            }
        }

        // Phương thức thay đổi mật khẩu
        public async Task<string> ChangePassword(int userId, string oldPassword, string newPassword)
        {
            try
            {
                var user = await GetUserById(userId);

                if (user != null)
                {
                    if (BCrypt.Net.BCrypt.Verify(oldPassword, user.Password))
                    {
                        user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
                        await db.SaveChangesAsync();
                        return null;
                    }
                    return "Old password is incorrect";
                }

                return "User not found";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

            // Phương thức sinh mã xác nhận ngẫu nhiên
        private string GenerateRandomCode()
        {
            Random random = new Random();
            int code = random.Next(100000, 999999);
            return code.ToString();
        }

        // Phương thức gửi email xác nhận
        private void SendConfirmationEmail(string toEmail, string confirmationCodeToken)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("trinmts2210028@fpt.edu.vn");
                mail.To.Add(toEmail);
                mail.Subject = "Hello we are Online Laundry, this is the email to confirm your email account.";

                // Sử dụng token thay vì mã xác nhận
                string confirmationLink = $"https://localhost:7240/api/User/confirmEmail/{confirmationCodeToken}";

                // Updated mail.Body to include an HTML button
                mail.Body = $@"<p>Please click the following button to confirm your email:</p>
                      <a href=""{confirmationLink}"" style=""display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;"">Confirm Email</a>";

                // Set the email body format to HTML
                mail.IsBodyHtml = true;

                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com"))
                {
                    smtp.Port = 587;
                    smtp.Credentials = new NetworkCredential("trinmts2210028@fpt.edu.vn", "vjvv rmpx ajpv sqhl");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }
        }

        public async Task<bool> UploadAvatar(int userId, IFormFile avatarFile)
        {
            try
            {
                var user = await GetUserById(userId);
                if (user != null && avatarFile != null)
                {
                    // Check if the user already has an avatar
                    if (!string.IsNullOrEmpty(user.Avatar))
                    {
                        // If yes, delete the old avatar file
                        string oldFilePath = Path.Combine("Images", user.Avatar);
                        if (File.Exists(oldFilePath))
                        {
                            File.Delete(oldFilePath);
                        }
                    }

                    // Save the new avatar file
                    string uploadsFolder = Path.Combine("Images");
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + avatarFile.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await avatarFile.CopyToAsync(fileStream);
                    }

                    // Update the avatar path in the database
                    user.Avatar = uniqueFileName;
                    db.Users.Update(user);
                    await db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Logout(int userId)
        {
            try
            {
                var user = await GetUserById(userId);
                if (user != null)
                {
                    user.isOnline = "Offline";
                    db.Users.Update(user);
                    await db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Ban(int userId)
        {
            try
            {
                var user = await GetUserById(userId);
                if (user != null)
                {
                    user.isBan = true;
                    await db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> CancelBan(int userId)
        {
            try
            {
                var user = await GetUserById(userId);
                if (user != null)
                {
                    user.isBan = false;
                    await db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> CheckAndUpdateUserActivity(int userId)
        {
            try
            {
                var user = await GetUserById(userId);
                if (user != null)
                {
                    if (user.isOnline == "Unknown")
                    {
                        user.isOnline = "Online";
                        await db.SaveChangesAsync();
                    }
                    await Task.Delay(TimeSpan.FromMinutes(2));
                    user.isOnline = "Unknown";
                    await db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                // Xử lý hủy bỏ công việc cũ
                return false;
            }
        }

        public async Task<User> GetInfoForForgotPassword(string username)
        {
            try
            {
                var user = await db.Users.SingleOrDefaultAsync(u => u.UserName == username);
                return user;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> SendCodeToResetPassword(string username)
        {
            try
            {
                var user = await GetInfoForForgotPassword(username);
                user.ConfirmationCode = GenerateRandomCode();
                db.Users.Update(user);
                await db.SaveChangesAsync();
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("trinmts2210028@fpt.edu.vn");
                    mail.To.Add(user.Email);
                    mail.Subject = "Confirmation Code for Reset";

                    // Updated mail.Body to include the confirmation code
                    mail.Body = $@"<p>Your confirmation code is: <strong>{user.ConfirmationCode}</strong></p>";

                    // Set the email body format to HTML
                    mail.IsBodyHtml = true;

                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com"))
                    {
                        smtp.Port = 587;
                        smtp.Credentials = new NetworkCredential("trinmts2210028@fpt.edu.vn", "vjvv rmpx ajpv sqhl");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        private async Task<bool> IsEmailUnique(string email)
        {
            // Kiểm tra xem địa chỉ email đã tồn tại trong cơ sở dữ liệu hay không
            return await db.Users.AllAsync(u => u.Email != email);
        }

        private async Task<bool> IsUserNameUnique(string userName)
        {
            // Kiểm tra xem UserName đã tồn tại trong cơ sở dữ liệu hay không
            return await db.Users.AllAsync(u => u.UserName != userName);
        }

        private async Task<bool> IsPhoneUnique(string phone)
        {
            // Kiểm tra xem UserName đã tồn tại trong cơ sở dữ liệu hay không
            return await db.Users.AllAsync(u => u.Phone != phone);
        }

        public async Task<string> GetConnectionId(int userId)
        {
            var connection = await db.UserConnections.SingleOrDefaultAsync(c => c.UserId == userId);
            if (connection == null)
            {
                return null;
            }
            return connection.ConnectionId; 
        }

        public async Task<bool> UpdateUserStatus(int userId, DateTime lastActivity, string status)
        {
            try
            {
                var user = await GetUserById(userId);
                if (user == null)
                {
                    return false;
                }
                user.LastActivity = DateTime.Now;
                user.isOnline = status;
                db.Users.Update(user);
                await db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<DateTime> GetLastActivity(int userId)
        {
            try
            {
                var user = await GetUserById(userId);
                return user.LastActivity;
            }
            catch(Exception ex)
            {
                return DateTime.MinValue;
            }
        }
    }
}
