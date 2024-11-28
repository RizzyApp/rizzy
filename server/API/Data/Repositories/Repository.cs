using System.Linq.Expressions;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace API.Data.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly AppDbContext _context;
    private readonly DbSet<T> _dbSet;
    private IDbContextTransaction? _currentTransaction;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAll()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T> AddAsync(T entity)
    {
        var addedEntity = await _context.AddAsync(entity);
        await _context.SaveChangesAsync();
        return addedEntity.Entity;
    }

    public async Task UpdateAsync(T entity)
    {
        _context.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Set<T>().FindAsync(id);
        if (entity != null)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveRangeAsync(IEnumerable<T> entities)
    {
        _context.Set<T>().RemoveRange(entities);
        await _context.SaveChangesAsync();
    }

    public IQueryable<T> Query()
    {
        return _dbSet.AsQueryable();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    

    public async Task<IEnumerable<T>> SearchAsync(Expression<Func<T, bool>> predicate)
    {
       return await _context.Set<T>().Where(predicate).ToListAsync();
    }

    public async Task<T?> FindFirstAsync(Expression<Func<T, bool>> predicate)
    {
        return await _context.Set<T>().Where(predicate).FirstOrDefaultAsync();
    }

    public async Task BeginTransactionAsync()
    {
        if (_currentTransaction is not null)
        {
            throw new InvalidOperationException("A transaction is already in progress");
        }
        
        _currentTransaction = await _context.Database.BeginTransactionAsync();
    }
    
    public async Task CommitAsync()
    {
        if (_currentTransaction == null)
        {
            throw new InvalidOperationException("No transaction in progress to commit.");
        }

        try
        {
            await _context.SaveChangesAsync();
            await _currentTransaction.CommitAsync();
        }
        finally
        {
            await _currentTransaction.DisposeAsync();
            _currentTransaction = null;
        }
    }

    public async Task RollbackAsync()
    {
        if (_currentTransaction is null)
        {
            throw new InvalidOperationException("No transaction in progress to roll back.");
        }

        try
        {
            await _currentTransaction.RollbackAsync();
        }
        finally
        {
            await _currentTransaction.DisposeAsync();
            _currentTransaction = null;
        }
    }
}