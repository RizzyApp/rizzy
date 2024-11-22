using System.Linq.Expressions;

namespace API.Data.Repositories;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAll();
    Task<T?> GetByIdAsync(int id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
    Task RemoveRangeAsync(IEnumerable<T> entities);
    IQueryable<T> Query();
    Task RollbackAsync();
    Task CommitAsync();
    Task BeginTransactionAsync();
    Task SaveChangesAsync();
    Task<IEnumerable<T>> SearchAsync(Expression<Func<T, bool>> predicate);
    Task<T?> FindFirstAsync(Expression<Func<T, bool>> predicate);
}