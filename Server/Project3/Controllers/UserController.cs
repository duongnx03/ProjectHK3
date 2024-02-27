using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Project3.Hubs;
using Project3.IServices;
using Project3.Models;
using Project3.Services;
using System.Net.Http;
using System.Security.Claims;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo userRepo;
        private readonly IHubContext<BanUserHub> hubContext;

        public UserController(IUserRepo userRepo, IHubContext<BanUserHub> hubContext)
        {
            this.userRepo = userRepo;
            this.hubContext = hubContext;
        }

        [AllowAnonymous]
        [HttpPost("createUser")]
        public async Task<ActionResult> Create(User user)
        {
            try
            {
                var errorMessage = await userRepo.CreateUser(user);
                if(errorMessage == null)
                {
                    return Ok();
                }
                return BadRequest(errorMessage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("resetPassword/{username}/{password}/{code}")]
        public async Task<IActionResult> ResetPassword(string username, string password, string code)
        {
            try
            {
                var user = await userRepo.ResetPassword(username, password, code);

                if (user != null)
                {
                    return Ok("Password reset successfully.");
                }
                return BadRequest();
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLogin userLogin)
        {
            try
            {
                var user = await userRepo.Authenticate(userLogin);
                if (user != null)
                {
                    if (user.isBan)
                    {
                        return Unauthorized("Your account has been banned. You cannot log in.");
                    }
                    var token = await userRepo.GenerateToken(user);
                    DateTimeOffset expireTime = DateTimeOffset.UtcNow.AddMinutes(50); 
                    Response.Cookies.Append("accessToken", token, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None,
                        Expires = expireTime
                    });
                    return Ok(new { message = "login success" });
                }
                return Unauthorized("Login failed. Invalid Username or Password.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getUserById")]
        [Authorize]
        public async Task<ActionResult> GetUserById()
        {
            try
            {
                // Lấy userId từ claim "UserId" trong token
                var userIdClaim = HttpContext.User.FindFirst("UserId");

                if (userIdClaim != null)
                {
                    // Sử dụng userId trong phương thức GetUserById
                    var userId = userIdClaim.Value;
                    var result = await userRepo.GetUserById(int.Parse(userId));
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Invalid value for userId in the token.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("confirmEmail/{confirmationCodeToken}")]
        [Authorize]
        public async Task<ActionResult> ConfirmEmail(string confirmationCodeToken)
        {
            try
            {
                var userIdClaim = HttpContext.User.FindFirst("UserId");

                if (userIdClaim == null)
                {
                    return BadRequest("Invalid value for userId in the token.");
                }

                var userId = int.Parse(userIdClaim.Value);

                var result = await userRepo.ConfirmEmail(userId, confirmationCodeToken);

                if (result)
                {
                    return Redirect("http://localhost:3000/profile/general");
                }
                else
                {
                    return BadRequest(new { message = "Invalid or expired confirmation token" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAvatar")]
        [Authorize]
        public async Task<ActionResult> GetAvatar()
        {
            try
            {
                var userIdClaim = HttpContext.User.FindFirst("UserId");

                if (userIdClaim == null)
                {
                    return BadRequest("Invalid value for userId in the token.");
                }

                var userId = int.Parse(userIdClaim.Value);
                var imageBytes = await userRepo.GetAvatar(userId);

                if (imageBytes != null)
                {
                    return File(imageBytes, "image/jpeg");
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("uploadAvatar")]
        [Authorize]
        public async Task<ActionResult> UploadAvatar([FromForm] IFormFile avatarFile)
        {
            try
            {
                var userIdClaim = HttpContext.User.FindFirst("UserId");

                if (userIdClaim != null)
                {
                    var userId = userIdClaim.Value;
                    var result = await userRepo.UploadAvatar(int.Parse(userId), avatarFile);
                    if (result)
                    {
                        return Ok(new { message = "Avatar updated successfully" });
                    }
                    return BadRequest(new { message = "Failed to update avatar" });
                }
                else
                {
                    return BadRequest("Invalid value for userId in the token.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("sendCodeToResetPassword/{username}")]
        public async Task<ActionResult> SendCodeToResetPassword(string username)
        {
            try
            {
                var result = await userRepo.SendCodeToResetPassword(username);

                if (result)
                {
                    return Ok("Code has been sent to your email, please check");
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("changePassword")]
        [Authorize]
        public async Task<ActionResult> ChangePassword([FromBody] UserChangePassword userChangePassword)
        {
            try
            {
                var userIdClaim = HttpContext.User.FindFirst("UserId");

                if (userIdClaim == null)
                {
                    return BadRequest("Invalid value for userId in the token.");
                }

                var userId = int.Parse(userIdClaim.Value);
        
                var errorMessage = await userRepo.ChangePassword(userId, userChangePassword.OldPassword, userChangePassword.NewPassword);

                if (errorMessage == null)
                {
                    return Ok(new { message = "Password changed successfully" });
                }
                else
                {
                    return BadRequest(errorMessage);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("editInfo")]
        [Authorize]
        public async Task<ActionResult> EditInfo([FromBody] UserEditInfo userEditInfo)
        {
            try
            {
                var userIdClaim = HttpContext.User.FindFirst("UserId");

                if (userIdClaim == null)
                {
                    return BadRequest("Invalid value for userId in the token.");
                }

                var userId = int.Parse(userIdClaim.Value);

                var result = await userRepo.EditInfo(userId, userEditInfo.Fullname, userEditInfo.Address, userEditInfo.Phone);

                if (result != null)
                {
                    return Ok(new { message = "Info changed successfully" });
                }
                else
                {
                    return BadRequest(new { message = "Failed to change info" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("searchUser/{username}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> SearchUser(string username)
        {
            try
            {
                var result = await userRepo.SearchUser(username);
                if(result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAllUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetAllUsers()
        {
            try
            {
                var list = await userRepo.GetAllUsers();
                return Ok(list);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("logout")]
        [Authorize]
        public async Task<ActionResult> LogOut()
        {
             try
             {
                 var userIdClaim = HttpContext.User.FindFirst("UserId");

                 if (userIdClaim == null)
                 {
                     return BadRequest("Invalid value for userId in the token.");
                 }

                 var userId = int.Parse(userIdClaim.Value);
                 var result = await userRepo.Logout(userId);
                 Response.Cookies.Delete("accessToken", new CookieOptions
                 {
                     HttpOnly = true,
                     Secure = true,
                     SameSite = SameSiteMode.None
                 }); // Xóa cookie đăng nhập
                return Ok(new { message = "Đăng xuất thành công" });
             }
             catch (Exception ex)
             {
                 return BadRequest(ex.Message);
             }
        }

        [HttpGet("banUser/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> BanUser(int userId)
        {
            try
            {
                var result = await userRepo.Ban(userId);
                if (result)
                {
                    var connectionId = await userRepo.GetConnectionId(userId);
                    await hubContext.Clients.Client(connectionId).SendAsync("UserBanned");
                    return Ok(result);
                }
                return BadRequest("Ban user failed");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("cancelBanUser/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> CancelBan(int userId)
        {
            try
            {
               var result = await userRepo.CancelBan(userId);
               if (result)
               {
                   return Ok("Cancel Ban user success");
               }    
               return BadRequest("Cancel Ban user fail");
            }
            catch (Exception ex)
            {
               return BadRequest(ex.Message);
            }
        }

        [HttpGet("checkAndUpdateUserStatus")]
        [Authorize]
        public async Task<ActionResult> CheckAndUpdateUserStatus()
        {
            try
            {
                var userIdClaim = HttpContext.User.FindFirst("UserId");
                if (userIdClaim == null)
                {
                    return BadRequest("Invalid value for userId in the token.");
                }
                var userId = int.Parse(userIdClaim.Value);
                var lastActivityTime = await userRepo.GetLastActivity(userId);
                var currentTime = DateTime.Now;
                var timeSinceLastActivity = currentTime - lastActivityTime;

                if (timeSinceLastActivity.TotalSeconds > 20)
                {
                    // Cập nhật trạng thái của người dùng thành Unknown
                    await userRepo.UpdateUserStatus(userId, DateTime.Now, "Unknown");
                    return Ok("User status updated.");
                }

                return Ok("User is active.");
            }
            catch (FormatException)
            {
                return BadRequest("Invalid format for user ID.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // Hàm để cập nhật thời gian hoạt động của người dùng khi họ thực hiện một hoạt động
        [HttpGet("updateUserActivityTime")]
        [Authorize]
        public async Task<ActionResult> UpdateUserActivityTime()
        {
            try
            {
                var userIdClaim = HttpContext.User.FindFirst("UserId");

                if (userIdClaim == null)
                {
                    return BadRequest("Invalid value for userId in the token.");
                }

                var userId = int.Parse(userIdClaim.Value);
                await userRepo.UpdateUserStatus(userId, DateTime.Now, "Online");
                return Ok("User activity time updated.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
