using System;
using System.Collections.Generic;
using TaskManager.Server.Enums;

namespace TaskManager.Server.Models;

public partial class UserTask
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime DueDate { get; set; }

    public required string Priority { get; set; }
    
    public required string Status { get; set; }
}
