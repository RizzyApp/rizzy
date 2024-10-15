//using API.Models;

//namespace API.Services;

//public class UserRepository : IUserRepository
//{
//    private readonly List<Users> _users = new List<Users>{new Users{ Id = 1, Username = "john_doe", Email = "john@example.com", Gender = Gender.Male },
//        new Users { Id = 2, Username = "jane_doe", Email = "jane@example.com", Gender = Gender.Female }};

//    public IEnumerable<Users> GetAll()
//    {
//        return _users;
//    }

//    public Users GetById(int id)
//    {
//        return _users.FirstOrDefault(u => u.Id == id);
//    }

//    public void Add(Users user)
//    {
//        user.Id = _users.Count > 0 ? _users.Max(u => u.Id) + 1 : 1;
//        _users.Add(user);
//    }

//    public void Delete(int id)
//    {
//        var user = GetById(id);
//        _users.Remove(user);
//    }
//}