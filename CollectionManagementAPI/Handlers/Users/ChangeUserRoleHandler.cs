using DataBaseMigrator.Context;
using DataBaseMigrator.Entity.Users.Types;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Users
{
    public class ChangeUserRoleHandler
    {
        public class Request : IRequest<Unit>
        {
            public long CurrentUserId { get; set; }

            public long UserId { get; set; }

            public SettingType RoleType { get; set; }
        }

        public class Handler : IRequestHandler<Request, Unit>
        {
            private readonly DataBaseContext dataBaseContext;

            public Handler(DataBaseContext dataBaseContext)
            {
                this.dataBaseContext = dataBaseContext;
            }

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await dataBaseContext.Users
                    .Include(it => it.UserRoles)
                    .SingleAsync(it => it.Id == request.UserId, cancellationToken);
                if (request.RoleType == SettingType.Blocked)
                {
                    user.RefreshToken = null;
                }

                var role = user.UserRoles.Single();
                role.Role = request.RoleType;
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
