using Project3.Models;

namespace Project3.IServices
{
    public interface IUserRepo
    {
        Task<User> Authenticate(UserLogin userLogin);
        Task<string> GenerateToken(User user);
        Task<IEnumerable<User>> GetAllUsers();
        Task<string> CreateUser(User user);
        Task<User> EditInfo(int id, string fullname, string address, string phone);
        Task<string> ChangePassword(int userId, string oldPassword, string newPassword);
        Task<IEnumerable<User>> SearchUser(string username);
        Task<User> GetInfoForForgotPassword (string username);
        Task<User> ResetPassword(string username, string password, string code);
        Task<User> GetUserById(int userId);
        Task<bool> ConfirmEmail(int userId, string confirmationCode);
        Task<bool> UploadAvatar(int userId, IFormFile avatarFile);
        Task<byte[]> GetAvatar(int userId);
        Task<bool> SendCodeToResetPassword(string username);
        Task<bool> Logout(int userId);
        Task<bool> Ban(int userId);
        Task<bool> CancelBan(int userId);
        Task<string> GetConnectionId(int userId);
        Task<bool> UpdateUserStatus(int userId, DateTime lastActivity, string status);
        Task<DateTime> GetLastActivity(int userId);
    }
}
