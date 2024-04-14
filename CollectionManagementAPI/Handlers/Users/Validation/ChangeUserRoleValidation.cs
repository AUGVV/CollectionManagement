using CollectionManagement.Exceptions;
using CollectionManagement.Services;
using DataBaseMigrator.Entity.Users.Types;
using FluentValidation;

namespace CollectionManagement.Handlers.Users.Validation
{
    public class ChangeUserRoleValidation : AbstractValidator<ChangeUserRoleHandler.Request>
    {
        private readonly IUserService userService;

        public ChangeUserRoleValidation(IUserService userService)
        {
            this.userService = userService;

            RuleFor(it => it.UserId)
                .MustAsync(ThrowIfUserDoesNotExist);

            RuleFor(it => it)
                .Must(IsCurrentUserNotEqualToUser)
                .WithMessage("You can't block yourself.")
                .WithErrorCode("BlockYourself")
                .When(it => it.RoleType == SettingType.Blocked);       
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

        private bool IsCurrentUserNotEqualToUser(ChangeUserRoleHandler.Request request)
        {
            return request.CurrentUserId != request.UserId;
        }
    }
}
