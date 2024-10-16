using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CrudController<T> : ControllerBase where T : class
{
    private readonly ILogger _logger;
    private readonly IRepository<T> _repository;

    public CrudController(ILogger logger, IRepository<T> repository)
    {
        _logger = logger;
        _repository = repository;
    }

    //GET api/[controller]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<T>>> GetAll()
    {
        var entities = await _repository.GetAll();
        return Ok(entities);
    }

    // POST api/[controller]
    [HttpPost]
    public async Task<ActionResult<T>> Create([FromBody] T entity)
    {
        await _repository.Add(entity);
        return Created(nameof(entity), entity);
    }

    // PUT api/[controller]/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] T entity)
    {
        var updateEntity = await _repository.GetById(id);
        if (updateEntity != null)
        {
            await _repository.Update(updateEntity);
            return Ok(entity);
        }

        return BadRequest();
    }

    // DELETE: api/[controller]/{id}
    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _repository.GetById(id);
        if (entity == null)
        {
            return NotFound();
        }

        await _repository.Delete(id);
        return NoContent();
    }
}