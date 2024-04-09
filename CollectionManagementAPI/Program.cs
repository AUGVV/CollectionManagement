using Microsoft.Extensions.Hosting;

namespace CollectionManagementAPI
{

    public class Program
    {
        public static void Main(string[] args) =>
            Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(builder =>
            {
                builder.UseStartup<Startup>();
            }).Build().Run();
    }
}