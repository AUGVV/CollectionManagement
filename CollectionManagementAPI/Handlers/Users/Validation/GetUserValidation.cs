using CollectionManagement.Exceptions;
using CollectionManagement.Services;
using FluentValidation;

namespace CollectionManagement.Handlers.Users.Validation
{
    public class GetUserValidation : AbstractValidator<GetUserHandler.Request>
    {
        private readonly IUserService userService;

        public GetUserValidation(IUserService userService)
        {
            this.userService = userService;

            RuleFor(it => it.UserId)
                .MustAsync(ThrowIfUserDoesNotExist);
        }

        private async Task<bool> ThrowIfUserDoesNotExist(
            long userId,
            CancellationToken cancellationToken)
        {
            var result = await userService.IsAnyUserExists(
                userId,
                cancellationToken);

            if (!result)
            {
                throw new NotFoundException();
            }

            return result;
        }
    }
}
