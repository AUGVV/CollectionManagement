using CollectionManagement.Constants;
using CollectionManagement.Services;
using DataBaseMigrator.Constants;
using FluentValidation;

namespace CollectionManagement.Handlers.Auth.Validation
{
    public class RegistrationValidation : AbstractValidator<RegistrationHandler.Request>
    {
        public RegistrationValidation(IUserService userService)
        {
            RuleFor(it => it.Nickname)
                .NotEmpty()
                .MinimumLength(UserValidationConstants.MinNicknameLength)
                .MaximumLength(UserValidationConstants.MaxNicknameLength)
                .MustAsync(userService.IsUserUniqueByNickname)
                .WithMessage(it => $"User with nickname: {it.Nickname} already exist")
                .WithErrorCode("NotUniqueNickname");

            RuleFor(it => it.Password)
                .NotEmpty()
                .MinimumLength(UserValidationConstants.MinPasswordLength)
                .MaximumLength(UserValidationConstants.MaxPasswordLength);

            RuleFor(it => it.Email)
                .NotEmpty()
                .EmailAddress()
                .MaximumLength(FieldConstants.NameFieldsLength)
                .MustAsync(userService.IsUserUniqueByEmail)
                .WithMessage(it => $"User with email: {it.Email} already exist")
                .WithErrorCode("NotUniqueEmail");
        }
    }
}
