using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class LogoutHandler
    {
        public class Request : IRequest<Unit>
        {
            public long UserId { get; set; }
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
                    .SingleAsync(it => it.Id == request.UserId, cancellationToken);

                user.RefreshToken = null;
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
