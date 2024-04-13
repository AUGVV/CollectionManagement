using CollectionManagement.Exceptions;
using CollectionManagement.Services;
using DataBaseMigrator.Constants;
using FluentValidation;

namespace CollectionManagement.Handlers.Auth.Validation
{
    public class LoginValidation : AbstractValidator<LoginHandler.Request>
    {
        private readonly IUserService userService;

        public LoginValidation(IUserService userService)
        {
            this.userService = userService;

            RuleFor(it => it)
                .MustAsync(ThrowIfUserDoesNotExist);
        }

        private async Task<bool> ThrowIfUserDoesNotExist(
            LoginHandler.Request request,
            CancellationToken cancellationToken)
        {
            var result = await userService.IsUserExistsByCredentials(
                request.Email,
                request.Password,
                cancellationToken);

            if (!result)
            {
                throw new UnauthorizedException();
            }

            return result;
        }
    }
}
