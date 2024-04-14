using CollectionManagement.Attributes;
using CollectionManagement.Controllers;
using CollectionManagement.Handlers.Users;
using CollectionManagement.Models.Base;
using CollectionManagement.Models.Users;
using CollectionManagement.Services;
using DataBaseMigrator.Entity.Users.Types;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagementAPI.Controllers
{
    public class UsersController(IMediator mediator, IAuthContext authContext) : BaseController(mediator)
    {
        private readonly IAuthContext authContext = authContext;

        [HttpGet]
        public async Task<GetUser> Get()
        {
            return await Mediator.Send(new GetUserHandler.Request
            {
                UserId = authContext.UserId
            });
        }

        [IsAdmin]
        [HttpGet("{userId}")]
        public async Task<GetUser> Get([FromRoute] long userId)
        {
            return await Mediator.Send(new GetUserHandler.Request
            {
                UserId = userId
            });
        }

        [IsAdmin]
        [HttpGet("get-users")]
        public async Task<Paginator<GetUser>> GetUsersList([FromQuery] GetUsersHandler.Request request)
        {
            return await Mediator.Send(request);
        }

        [IsAdmin]
        [HttpPut("set-admin-role/{userId}")]
        public async Task<IActionResult> SetAdminRole([FromRoute] long userId)
        {
            await Mediator.Send(new ChangeUserRoleHandler.Request()
            {
                CurrentUserId = authContext.UserId,
                RoleType = SettingType.Admin,
                UserId = userId
            });
            return new NoContentResult();
        }

        [IsAdmin]
        [HttpPut("set-user-role/{userId}")]
        public async Task<IActionResult> SetUserRole([FromRoute] long userId)
        {
            await Mediator.Send(new ChangeUserRoleHandler.Request()
            {
                CurrentUserId = authContext.UserId,
                RoleType = SettingType.User,
                UserId = userId
            });
            return new NoContentResult();
        }

        [IsAdmin]
        [HttpPut("set-block-role/{userId}")]
        public async Task<IActionResult> SetBlockRole([FromRoute] long userId)
        {
            await Mediator.Send(new ChangeUserRoleHandler.Request()
            {
                CurrentUserId = authContext.UserId,
                RoleType = SettingType.Blocked,
                UserId = userId
            });
            return new NoContentResult();
        }

        [HttpPut("set-light-mode")]
        public async Task<IActionResult> SetLigtMode()
        {
            await Mediator.Send(new ChangeUserSettingsHandler.Request()
            {
                ConfigType = ConfigType.Theme,
                Value = "Light",
                UserId = authContext.UserId
            });
            return new NoContentResult();
        }

        [HttpPut("set-dark-mode")]
        public async Task<IActionResult> SetDarkMode()
        {
            await Mediator.Send(new ChangeUserSettingsHandler.Request()
            {
                ConfigType = ConfigType.Theme,
                Value = "Dark",
                UserId = authContext.UserId
            });
            return new NoContentResult();
        }

        [HttpPut("set-ru-mode")]
        public async Task<IActionResult> SetRuMode()
        {
            await Mediator.Send(new ChangeUserSettingsHandler.Request()
            {
                ConfigType = ConfigType.Language,
                Value = "ru-RU",
                UserId = authContext.UserId
            });
            return new NoContentResult();
        }

        [HttpPut("set-en-mode")]
        public async Task<IActionResult> SetEnMode()
        {
            await Mediator.Send(new ChangeUserSettingsHandler.Request()
            {
                ConfigType = ConfigType.Language,
                Value = "en-US",
                UserId = authContext.UserId
            });
            return new NoContentResult();
        }

        [HttpPost("update")]
        public async Task<GetUser> UpdateUser([FromBody] UpdateUserMetadataHandler.Request request)
        {
            request.UserId = authContext.UserId;
            return await Mediator.Send(request);
        }

        [IsAdmin]
        [HttpPost("update/{userId}")]
        public async Task<GetUser> UpdateUserByAdmin(
            [FromRoute] long userId,
            [FromBody] UpdateUser updateUser)
        {
            return await Mediator.Send(new UpdateUserMetadataHandler.Request()
            {
                UserId = userId,
                Nickname = updateUser.Nickname
            });
        }

        [HttpPut("change-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] ChangePassword changePassword)
        {
            await Mediator.Send(new ChangePasswordHandler.Request()
            {
                UserId = authContext.UserId,
                NewPassword = changePassword.NewPassword,
                OldPassword = changePassword.OldPassword
            });
            return new NoContentResult();
        }
    }
}
