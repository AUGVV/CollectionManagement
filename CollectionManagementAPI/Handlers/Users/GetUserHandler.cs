using CollectionManagement.Models.Auth;
using CollectionManagement.Models.Users;
using CollectionManagement.Services;
using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class GetUserHandler
    {
        public class Request : IRequest<TokensModel>
        {
            public long UserId { get; set; }
        }

        public class Handler : IRequestHandler<Request, TokensModel>
        {
            private readonly IAuthService authService;
            private readonly DataBaseContext dataBaseContext;

            public Handler(DataBaseContext dataBaseContext, IAuthService authService)
            {
                this.authService = authService;
                this.dataBaseContext = dataBaseContext;
            }

            public async Task<TokensModel> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await dataBaseContext.Users
                    .SingleAsync(it => it.Id == 1, cancellationToken);

                user.RefreshToken = authService.CreateJwtToken(user.Id, true);
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return new TokensModel
                {
                    AccessToken = authService.CreateJwtToken(user.Id),
                    RefreshToken = user.RefreshToken
                };
            }
        }
    }
}
