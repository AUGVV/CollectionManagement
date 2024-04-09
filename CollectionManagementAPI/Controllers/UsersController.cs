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

        [HttpGet("GetUser")]
        public Task Get()
        {
           return Task.CompletedTask;
        }
    }
}
