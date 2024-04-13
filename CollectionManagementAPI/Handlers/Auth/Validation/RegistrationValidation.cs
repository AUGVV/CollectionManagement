using DataBaseMigrator.Constants;
using FluentValidation;

namespace CollectionManagement.Handlers.Auth.Validation
{
    public class RegistrationValidation : AbstractValidator<RegistrationHandler.Request>
    {
        public RegistrationValidation()
        {
            RuleFor(it => it.Nickname)
                .NotEmpty()
                .MaximumLength(FieldConstants.NameFieldsLength);

            RuleFor(it => it.Password)
                .NotEmpty()
                .MaximumLength(FieldConstants.NameFieldsLength);

            RuleFor(it => it.Email)
                .NotEmpty()
                .EmailAddress()
                .MaximumLength(FieldConstants.NameFieldsLength);
        }
    }
}
