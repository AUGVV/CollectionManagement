using CollectionManagement.Exceptions;
using CollectionManagement.Handlers.Auth;
using CollectionManagement.Services;
using FluentValidation;

namespace CollectionManagement.Handlers.Users.Validation
{
    public class RemoveTypeItemValidation : AbstractValidator<RemoveTypeItemHandler.Request>
    {
        private readonly ICollectionService collectionService;

        public RemoveTypeItemValidation(
            ICollectionService collectionService)
        {
            this.collectionService = collectionService;

            RuleFor(it => it)
                .MustAsync(ThrowIfUserDoesNotExist);
        }

        private async Task<bool> ThrowIfUserDoesNotExist(
            RemoveTypeItemHandler.Request request,
            CancellationToken cancellationToken)
        {
            var result = await collectionService.IsCollectionTypeExist(
                request.ItemId,
                cancellationToken);

            if (!result)
            {
                throw new NotFoundException();
            }

            return result;
        }
    }
}
