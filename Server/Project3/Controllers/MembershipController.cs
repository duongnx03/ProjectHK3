using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project3.IServices;
using Project3.Models;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipController : ControllerBase
    {
        private readonly IMembershipRepo _membershipRepo;

        public MembershipController(IMembershipRepo membershipRepo)
        {
            _membershipRepo = membershipRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllMemberships()
        {
            var memberships = await _membershipRepo.GetAllMemberships();
            return Ok(memberships);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMembershipById(int id)
        {
            var membership = await _membershipRepo.GetMembershipById(id);
            if (membership == null)
            {
                return NotFound();
            }
            return Ok(membership);
        }

        [HttpPost]
        public async Task<IActionResult> AddMembership(Membership membership)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool success = await _membershipRepo.AddMembership(membership);
            if (!success)
            {
                return Conflict("Email already exists.");
            }

            return CreatedAtAction(nameof(GetMembershipById), new { id = membership.MembershipId }, membership);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMembership(int id)
        {
            bool success = await _membershipRepo.DeleteMembership(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost("renew")]
        public async Task<IActionResult> RenewMembershipByEmail(string email)
        {
            bool success = await _membershipRepo.RenewMembershipByEmail(email);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
        [HttpPost("order")]
        public async Task<IActionResult> OrderMembership(int membershipId, int weightOrdered)
        {
            bool success = await _membershipRepo.OrderMembership(membershipId, weightOrdered);
            if (!success)
            {
                return BadRequest("Failed to order membership.");
            }

            return NoContent();
        }
    }
}
