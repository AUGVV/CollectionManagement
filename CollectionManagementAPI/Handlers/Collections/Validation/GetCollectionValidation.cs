using CollectionManagement.Exceptions;
using CollectionManagement.Handlers.Auth;
using CollectionManagement.Services;
using FluentValidation;

namespace CollectionManagement.Handlers.Users.Validation
{
    public class GetCollectionValidation : AbstractValidator<GetCollectionItemHandler.Request>
    {
        private readonly ICollectionService collectionService;

        public GetCollectionValidation(
            ICollectionService collectionService)
        {
            this.collectionService = collectionService;

            RuleFor(it => it)
                .MustAsync(ThrowIfUserDoesNotExist);
        }

        private async Task<bool> ThrowIfUserDoesNotExist(
            GetCollectionItemHandler.Request request,
            CancellationToken cancellationToken)
        {
            var result = await collectionService.IsCollectionExist(
                request.CollectionId,
                cancellationToken);

            if (!result)
            {
                throw new NotFoundException();
            }

            return result;
        }
    }
}