using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TaskManager.Server.Controllers;
using TaskManager.Server.Models;
using Xunit;

namespace BackendTest
{
    public class TaskControllerTests : IDisposable
    {
        private readonly UserTasksContext _context;
        private readonly TaskController _controller;

        public TaskControllerTests()
        {
            var options = new DbContextOptionsBuilder<UserTasksContext>()
                .UseInMemoryDatabase("TaskManagerTestDb")
                .Options;

            _context = new UserTasksContext(options);
            _controller = new TaskController(_context);

            SeedDatabase();
        }

        private void SeedDatabase()
        {
            _context.UserTasks.AddRange(
                new UserTask { Id = 1, Title = "Task 1", DueDate = DateTime.Now, Priority = "High", Status = "Pending" },
                new UserTask { Id = 2, Title = "Task 2", DueDate = DateTime.Now, Priority = "Low", Status = "Completed" }
            );
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }


        [Fact]
        public async Task GetTasks_ReturnsAllTasks()
        {
            // Act
            var result = await _controller.GetTasks();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<UserTask>>>(result);
            var tasks = Assert.IsAssignableFrom<IEnumerable<UserTask>>(actionResult.Value);
            var task= actionResult.Value;
            Assert.Equal(2, tasks.Count());
            Assert.Equal("Task 1", task?.FirstOrDefault()?.Title);
            Assert.Equal("Low", task?.LastOrDefault()?.Priority);
        }

        [Fact]
        public async Task GetTaskByValidId_ReturnsTask()
        {
            // Act
            var result = await _controller.GetTask(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserTask>>(result);
            var task = Assert.IsType<UserTask>(actionResult.Value);
            Assert.Equal("Task 1", task.Title);
            Assert.Equal("Pending", task.Status);
        }

        [Fact]
        public async Task GetTaskByInvalidId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.GetTask(9999);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PostTask_AddsNew_ValidTask()
        {
            // Arrange
            var newTask = new UserTask { Title = "New Task", DueDate = DateTime.Now.AddDays(3), Priority = "VeryHigh", Status = "InProgress" };

            // Act
            var postResult = await _controller.PostTask(newTask);
            var getResult = await _controller.GetTasks();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<UserTask>>>(getResult);
            var tasks = Assert.IsAssignableFrom<IEnumerable<UserTask>>(actionResult.Value);
            Assert.Equal(3, tasks.Count());
            Assert.NotNull(tasks?.LastOrDefault());
            Assert.Equal("New Task", tasks?.LastOrDefault()?.Title);
            Assert.Equal("InProgress", tasks?.LastOrDefault()?.Status);
        }
        [Fact]
        public async Task PostTask_AddsNew_InvalidStatusTask()
        {
            // Arrange
            var newTask = new UserTask { Title = "New Task", DueDate = DateTime.Now.AddDays(3), Priority = "VeryHigh", Status = "Invalid" };

            // Act
            var result = await _controller.PostTask(newTask);

            // Assert
            var actionResult = Assert.IsType<BadRequestResult>(result.Result);           
        }
        [Fact]
        public async Task PostTask_AddsNew_InvalidPriorityTask()
        {
            // Arrange
            var newTask = new UserTask { Title = "New Task", DueDate = DateTime.Now.AddDays(3), Priority = "Invalid", Status = "InProgress" };

            // Act
            var result = await _controller.PostTask(newTask);

            // Assert
            var actionResult = Assert.IsType<BadRequestResult>(result.Result);

        }

        [Fact]
        public async Task DeleteTask_RemovesTask()
        {
            // Act
            var result = await _controller.DeleteTask(1);
            var getResult = await _controller.GetTasks();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<UserTask>>>(getResult);
            var tasks = Assert.IsAssignableFrom<IEnumerable<UserTask>>(actionResult.Value);
            Assert.IsType<NoContentResult>(result);
            Assert.Equal(1, tasks?.Count());
            Assert.NotNull(tasks);
            Assert.DoesNotContain(tasks, task => task.Title == "Task 1");
        }
    }
}
