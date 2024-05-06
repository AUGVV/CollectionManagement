using CollectionManagement.Handlers.Auth;
using CollectionManagement.Services;
using DataBaseMigrator.Constants;
using FluentValidation;

namespace CollectionManagement.Handlers.Users.Validation
{
    public class AddCollectionItemValidation : AbstractValidator<AddCollectionItemHandler.Request>
    {
        public AddCollectionItemValidation(
            ICollectionService collectionService)
        {
            RuleFor(it => it.CollectionTypeId)
                .MustAsync(collectionService.IsCollectionTypeExist)
                .WithMessage("Collection type does not exist.")
                .WithErrorCode("CollectionTypeDoesNotExist");

            RuleFor(it => it.Title)
                .NotEmpty()
                .MaximumLength(FieldConstants.TitleFieldsLength);

            RuleFor(it => it.Description)
               .NotEmpty()
               .MaximumLength(FieldConstants.DescriptionFieldsLength);
        }
    }
}
