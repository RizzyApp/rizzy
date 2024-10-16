using System.Text;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class UserController : CrudController<User>
{
    private readonly ILogger<UserController> _logger;
        private readonly IRepository<User> _repository;

        public UserController(ILogger<UserController> logger, IRepository<User> repository) 
            : base(logger, repository)
        {
            _logger = logger;
            _repository = repository;
        }
}