using API.Models;

namespace API.Services;

public interface IUserRepository
{
    IEnumerable<User> GetAll();
    User GetById(int id);
    void Add(User user);
    void Delete(int id);
}