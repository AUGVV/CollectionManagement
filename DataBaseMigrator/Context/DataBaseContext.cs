using DataBaseMigrator.Context.Configs.Users;
using DataBaseMigrator.Entity.Users;
using Microsoft.EntityFrameworkCore;

namespace DataBaseMigrator.Context
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) 
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserConfig> UserConfigs { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }


     //   public DbSet<Tag> Tags { get; set; }
     //   public DbSet<Collection> Collections { get; set; }
     //   public DbSet<Element> Elements { get; set; }
     //   public DbSet<Comment> Comments { get; set; }
     //   public DbSet<Part> Parts { get; set; }
     
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserConfigs());
            modelBuilder.ApplyConfiguration(new UserRoleConfigs());
            modelBuilder.ApplyConfiguration(new UserConfigConfigs());
        }
    }
}
