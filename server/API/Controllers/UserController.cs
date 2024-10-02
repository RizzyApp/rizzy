using System.Text;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _userRepository.GetAll();
        return Ok(users);
    }
    
    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _userRepository.GetById(id);
        return Ok(user);
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] User user)
    {
        if (user == null)
        {
            return BadRequest();
        }
        
        _userRepository.Add(user);
        return Ok(new { message = $"{user.Username} was successfully created", user });
    }
    
    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, User updatedUser)
    {
        var user = _userRepository.GetById(id);
        if (user == null)
        {
            return NotFound();
        }

        user.Username = updatedUser.Username ?? user.Username;
        user.Email = updatedUser.Email ?? user.Email;
        user.Gender = updatedUser.Gender != null ? updatedUser.Gender : user.Gender;
        user.BirthDate = updatedUser.BirthDate != default ? updatedUser.BirthDate : user.BirthDate;
        user.Bio = updatedUser.Bio ?? user.Bio;
        user.IsVerified = updatedUser.IsVerified; 
        user.Role = updatedUser.Role ?? user.Role;
        user.LastActivity = updatedUser.LastActivity;

        return Ok(new {message = $"{user.Username} has been updated successfully.", user});
    }
    
    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = _userRepository.GetById(id);
        if (user == null)
        {
            return NotFound();
        }

        _userRepository.Delete(id);
        return Ok(new { message = $"{user.Username} is successfully deleted.", user });
    }
}