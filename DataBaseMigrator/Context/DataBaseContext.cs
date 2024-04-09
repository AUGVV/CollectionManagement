using DataBaseMigrator.Entity.Collections;
using DataBaseMigrator.Entity.Elements;
using DataBaseMigrator.Entity.Users;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace DataBaseMigrator.Context
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext()
        {
            Database.EnsureCreated();
        }

        // private readonly string connection = $@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename={Environment.CurrentDirectory}\DisBot.mdf; MultipleActiveResultSets=True; Integrated Security=True";
        private readonly string connection = $@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\0000000S\source\repos\DisBot\DataBase\DisBot.mdf; Integrated Security=True; MultiSubnetFailover=True; Encrypt=False; TrustServerCertificate=False; ApplicationIntent=ReadWrite; Integrated Security=True; Connect Timeout=30";

        public DbSet<User> Users { get; set; }
        public DbSet<UserConfig> UserConfigs { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }


        public DbSet<Tag> Tags { get; set; }

        public DbSet<Collection> Collections { get; set; }


        public DbSet<Element> Elements { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Part> Parts { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder OptionsBuilder)
        {
            if (!OptionsBuilder.IsConfigured)
            {
                Console.WriteLine(connection);
                object value = OptionsBuilder.UseSqlServer(connection, sql =>
                {
                    sql.CommandTimeout(int.MaxValue);
                    sql.MigrationsAssembly(typeof(Program).GetTypeInfo().Assembly.GetName().Name);
                });
                OptionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {





        }
    }
}
