using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Server.Enums;
using TaskManager.Server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TaskManager.Server.Controllers


{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly UserTasksContext _context;

        public TaskController(UserTasksContext context)
        {
            _context = context;
        }

        // GET: api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserTask>>> GetTasks()
        {
            return await _context.UserTasks.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserTask>> GetTask(int id)
        {
            var task = await _context.UserTasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, [FromBody] UserTask task)
        {
            if (id != task.Id ||
                !Enum.IsDefined(typeof(StatusEnum), task.Status) ||
                !Enum.IsDefined(typeof(PriorityEnum), task.Priority))
            { return BadRequest(); }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<UserTask>> PostTask(UserTask task)
        {
            if (!Enum.IsDefined(typeof(StatusEnum), task.Status) ||
                !Enum.IsDefined(typeof(PriorityEnum), task.Priority))
            { return BadRequest(); }
            try
            {
                _context.UserTasks.Add(task);
                await _context.SaveChangesAsync();
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"{ex.Message}");
            }
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }


        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.UserTasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.UserTasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.UserTasks.Any(e => e.Id == id);
        }
    }
}
