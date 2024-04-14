using CollectionManagement.Constants;
using CollectionManagement.Exceptions;
using CollectionManagement.Services;
using FluentValidation;

namespace CollectionManagement.Handlers.Users.Validation
{
    public class UpdateUserMetadataValidation : AbstractValidator<UpdateUserMetadataHandler.Request>
    {
        private readonly IUserService userService;

        public UpdateUserMetadataValidation(IUserService userService)
        {
            this.userService = userService;

            RuleFor(it => it.UserId)
                .MustAsync(ThrowIfUserDoesNotExist)
                .DependentRules(() =>
                    RuleFor(it => it.Nickname)
                        .NotEmpty()
                        .MinimumLength(UserValidationConstants.MinNicknameLength)
                        .MaximumLength(UserValidationConstants.MaxNicknameLength)
                        .MustAsync(userService.IsUserUniqueByNickname)
                        .WithMessage(it => $"User with nickname: {it.Nickname} already exist")
                        .WithErrorCode("NotUniqueNickname"));
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
