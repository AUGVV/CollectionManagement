using CollectionManagement.Attributes;
using CollectionManagement.Exceptions;
using CollectionManagement.Services;
using DataBaseMigrator.Context;
using DataBaseMigrator.Entity.Users.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Middleware
{
    public class RoleCheckMiddleware
    {
        private readonly RequestDelegate next;

        public RoleCheckMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(
            HttpContext context,
            IAuthContext authContext,
            DataBaseContext dataBaseContext)
        {
            var endpoint = context.GetEndpoint();
            if (endpoint?.Metadata.GetMetadata<IAllowAnonymous>() is not null)
            {
                await next(context);
                return;
            }

            if (authContext != null && endpoint?.Metadata.GetMetadata<IsAdminAttribute>() is not null)
            {
                var adminExist = await dataBaseContext.Users
                    .Include(it => it.UserRoles)
                    .AnyAsync(it => it.Id == authContext.UserId
                        && it.UserRoles.Any(role => role.Role == SettingType.Admin));

                if (!adminExist)
                {
                    throw new UnauthorizedException();
                }
            }

            await next(context);
        }
    }
}
