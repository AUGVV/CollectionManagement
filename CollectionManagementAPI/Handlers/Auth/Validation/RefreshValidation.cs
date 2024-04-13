using CollectionManagement.Exceptions;
using CollectionManagement.Services;
using FluentValidation;
using FluentValidation.Results;

namespace CollectionManagement.Handlers.Auth.Validation
{
    public class RefreshValidation : AbstractValidator<RefreshHandler.Request>
    {
        private readonly IAuthService authService;
        private readonly IUserService userService;
        private long userId;

        public RefreshValidation(IAuthService authService, IUserService userService)
        {
            this.authService = authService;
            this.userService = userService;

            RuleFor(it => it.RefreshToken)
                .Cascade(CascadeMode.Stop)
                .NotEmpty()
                .MustAsync(ThrowIfUserDoesNotExist)
                .Must(CheckRefreshToken)
                .WithMessage("Token has expired or token is invalid.")
                .WithErrorCode("RefreshTokenError");
        }

        public override Task<ValidationResult> ValidateAsync(
            ValidationContext<RefreshHandler.Request> context,
            CancellationToken cancellationToken)
        {
            userId = authService.GetTokenUserId(context.InstanceToValidate.RefreshToken);
            return base.ValidateAsync(context, cancellationToken);
        }

        private bool CheckRefreshToken(string refreshToken)
        {
            return authService.ValidateJwtToken(refreshToken, true);
        }

        private async Task<bool> ThrowIfUserDoesNotExist(
            string refreshToken,
            CancellationToken cancellationToken)
        {
            var result = await userService.IsRefreshTokenRelatedToUser(userId, refreshToken, cancellationToken);
            if(!result)
            {
                throw new UnauthorizedException();
            }

            return result;
        }
    }
}
