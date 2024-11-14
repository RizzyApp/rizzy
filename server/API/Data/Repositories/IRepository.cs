using System.Linq.Expressions;
using API.Models;

namespace API.Services;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAll();
    Task<T?> GetById(int id);
    Task Add(T entity);
    Task Update(T entity);
    Task Delete(int id);
    IQueryable<T> Query();
    Task SaveChangesAsync();
    Task<IEnumerable<T>> Search(Expression<Func<T, bool>> predicate);
}