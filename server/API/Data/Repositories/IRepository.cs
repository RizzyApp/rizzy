using System.Linq.Expressions;

namespace API.Data.Repositories;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAll();
    Task<T?> GetById(int id);
    Task Add(T entity);
    Task Update(T entity);
    Task Delete(int id);
    Task RemoveRange(IEnumerable<T> entities);
    IQueryable<T> Query();
    Task RollbackAsync();
    Task CommitAsync();
    Task BeginTransactionAsync();
    Task SaveChangesAsync();
    Task<IEnumerable<T>> Search(Expression<Func<T, bool>> predicate);
}