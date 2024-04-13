using CollectionManagement.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagementAPI.Controllers
{

    public class UsersController : BaseController
    {
        public UsersController(IMediator mediator)
            : base(mediator)
        {
        }

        [HttpGet]
        public Task Get()
        {
           return Task.CompletedTask;
        }
        /*
        [HttpGet("get-users")]
        public Task GetUsersList()
        {
            return Task.CompletedTask;
        }

        [HttpPut("add-admin-role")]
        public async Task<string> AddAdminRole([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [HttpPut("remove-admin-role")]
        public async Task<string> RemoveAdminRole([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [HttpPut("block")]
        public async Task<string> Block([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [HttpPut("unblock")]
        public async Task<string> Unblock([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [HttpPut("change-settings")]
        public async Task<string> AcceptInvite([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [HttpPut("remove-user")]
        public async Task<string> RemoveUser([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }
        */
    }
}
