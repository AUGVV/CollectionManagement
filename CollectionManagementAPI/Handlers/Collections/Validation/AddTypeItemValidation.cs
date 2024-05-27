using CollectionManagement.Handlers.Auth;
using DataBaseMigrator.Constants;
using FluentValidation;

namespace CollectionManagement.Handlers.Users.Validation
{
    public class AddTypeItemValidation : AbstractValidator<AddTypeItemHandler.Request>
    {
        public AddTypeItemValidation()
        {
            RuleFor(it => it.Name)
                .NotEmpty()
                .MaximumLength(FieldConstants.TitleFieldsLength);
        }
    }
}
