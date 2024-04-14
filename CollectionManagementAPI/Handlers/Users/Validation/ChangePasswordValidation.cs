using CollectionManagement.Constants;
using CollectionManagement.Services;
using FluentValidation;
using FluentValidation.Results;

namespace CollectionManagement.Handlers.Users.Validation
{
    public class ChangePasswordValidation : AbstractValidator<ChangePasswordHandler.Request>
    {
        private long userId;

        public ChangePasswordValidation(IUserService userService)
        {
            RuleFor(it => it.OldPassword)
                .MinimumLength(UserValidationConstants.MinPasswordLength)
                .MaximumLength(UserValidationConstants.MaxPasswordLength)
                .MustAsync((password, cancellationToken) => userService.IsUserExistsByCredentials(userId, password, cancellationToken))
                .WithMessage(it => $"Invalid old password, try again")
                .WithErrorCode("InvalidPassword");

            RuleFor(it => it.NewPassword)
                .NotEmpty()
                .MinimumLength(UserValidationConstants.MinPasswordLength)
                .MaximumLength(UserValidationConstants.MaxPasswordLength);
        }

        public override Task<ValidationResult> ValidateAsync(
            ValidationContext<ChangePasswordHandler.Request> context,
            CancellationToken cancellationToken)
        {
            userId = context.InstanceToValidate.UserId;
            return base.ValidateAsync(context, cancellationToken);
        }
    }
}
