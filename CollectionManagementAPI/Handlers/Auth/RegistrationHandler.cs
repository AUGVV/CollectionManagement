using CollectionManagement.Models.Auth;
using CollectionManagement.Models.Users;
using CollectionManagement.Services;
using DataBaseMigrator.Context;
using DataBaseMigrator.Entity.Users;
using DataBaseMigrator.Entity.Users.Types;
using MediatR;

namespace CollectionManagement.Handlers.Auth
{
    public class RegistrationHandler
    {
        public class Request : RegistrationModel, IRequest<TokensModel>
        {
        }

        public class Handler : IRequestHandler<Request, TokensModel>
        {
            private readonly DataBaseContext dataBaseContext;
            private readonly IAuthService authService;

            public Handler(DataBaseContext dataBaseContext, 
                IAuthService authService)
            {
                this.dataBaseContext = dataBaseContext;
                this.authService = authService;
            }

            public async Task<TokensModel> Handle(Request request, CancellationToken cancellationToken)
            {
                var newUser = new User
                {
                    CreationDate = DateTime.UtcNow,
                    Email = request.Email,
                    Nickname = request.Nickname,
                    IsVerified = false,
                    Password = request.Password,
                    RefreshToken = null,
                    VerificationCode = "Code",
                    UserRoles = [new UserRole { Role = SettingType.User }],
                    UserConfig =
                    [
                        new() {
                            ConfigType = ConfigType.Language,
                            Value = "en-US"
                        },
                        new() {
                            ConfigType = ConfigType.Theme,
                            Value = "Light"
                        }
                    ]
                };
                dataBaseContext.Users.Add(newUser);
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                var refreshToken = authService.CreateJwtToken(newUser.Id, true);
                newUser.RefreshToken = refreshToken;
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return new TokensModel
                {
                    AccessToken = authService.CreateJwtToken(newUser.Id),
                    RefreshToken = newUser.RefreshToken
                };
            }
        }
    }
}
