using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Server.Enums;
using TaskManager.Server.Models;

namespace TaskManager.Server.Controllers


{

    [Route("api/[controller]")]
    [ApiController]
    public class TaskSearchController : ControllerBase
    {
        private readonly UserTasksContext _context;

        public TaskSearchController(UserTasksContext context)
        {
            _context = context;
        }

        // GET: api/TaskSearch/priority/{priority}
        [HttpGet("priority/{priority}")]
        public async Task<ActionResult<IEnumerable<UserTask>>> GetTaskByPriority(PriorityEnum priority)
        {
            var task = await _context.UserTasks.Where(p =>p.Priority==priority.ToString()).ToListAsync();

            if (task == null || !task.Any())
            {
                return NotFound();
            }

            return task;
        }

        // GET: api/TaskSearch/status/{status}
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<UserTask>>> GetTaskByStatus(StatusEnum status)
        {
            var task = await _context.UserTasks.Where(p => p.Status == status.ToString()).ToListAsync();

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // GET: api/TaskSearch/date/{date}
        [HttpGet("date/{date}")]
        public async Task<ActionResult<IEnumerable<UserTask>>> GetTaskByDueDate(DateTime date)
        {
            var task = await _context.UserTasks.Where(p => p.DueDate.Date == date.Date).ToListAsync();

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

    }

}
