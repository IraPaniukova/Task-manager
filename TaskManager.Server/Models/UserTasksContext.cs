using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Server.Models;

public partial class UserTasksContext : DbContext
{
    public UserTasksContext()
    {
    }

    public UserTasksContext(DbContextOptions<UserTasksContext> options)
        : base(options)
    {
    }

    public virtual DbSet<UserTask> UserTasks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=UserTasks;Trusted_Connection=True;;encrypt=true;trustservercertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserTask>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserTask__3214EC0781CB5C83");;
            entity.Property(e => e.DueDate).HasColumnType("datetime");
            entity.Property(e => e.Priority).HasMaxLength(50);
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
