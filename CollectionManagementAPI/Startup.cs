using AutoMapper;
using CollectionManagement.Behavior;
using CollectionManagement.Mapper;
using CollectionManagement.Middleware;
using CollectionManagement.Options;
using CollectionManagement.Services;
using DataBaseMigrator.Context;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text.RegularExpressions;

namespace CollectionManagementAPI
{
    public class Startup
    {
        private IConfiguration configuration { get; set; }

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Startup>());

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<DataBaseContext>(options => options.UseSqlServer(connectionString, _ => { }));

            services.AddHttpContextAccessor();
            services.AddSwaggerGen(opt =>
            {
               
                opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "type jwt here",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                opt.CustomSchemaIds(type =>
                {
                    if (type.IsGenericType)
                    {
                        return new Regex("`\\d")
                            .Replace(type.ToString()
                                .Replace("+", "_")
                                .Replace("[", "_")
                                .Replace("]", string.Empty),
                                string.Empty);
                    }
                    return type.FullName.Replace("+", "-");
                });
                opt.AddSecurityRequirement(
                    new OpenApiSecurityRequirement
                    { {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    } });
             });

            services.Configure<JwtCredentialsOptions>(configuration.GetSection(nameof(JwtCredentialsOptions)));
            var jwtOptions = configuration.GetSection(nameof(JwtCredentialsOptions)).Get<JwtCredentialsOptions>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option =>
            {
                option.RequireHttpsMetadata = false;
                option.SaveToken = true;
                option.TokenValidationParameters = new TokenValidationParameters
                {
                    SaveSigninToken = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidIssuer = jwtOptions.Issuer,
                    ValidAudience = jwtOptions.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(jwtOptions.Key))
                };
            });

            services.AddValidatorsFromAssembly(typeof(Startup).Assembly);
            services.AddScoped<IAuthContext, AuthContext>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICollectionService, CollectionService>();
            services.AddTransient<ExceptionMiddleware>();
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            services.AddAutoMapper(opt =>
            {
                opt.AddProfile(new UserAutoMapper());
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(x => x
               .AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());

            app.UseHttpsRedirection()
               .UseMiddleware<ExceptionMiddleware>()
               .UseRouting()
               .UseAuthorization()
               .UseMiddleware<RoleCheckMiddleware>()
               .UseSwagger()
               .UseSwaggerUI()
               .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers().RequireAuthorization();
                });
        }
    }
}
