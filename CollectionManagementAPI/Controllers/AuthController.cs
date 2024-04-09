using CollectionManagement.Controllers;
using CollectionManagement.Handlers.Auth;
using CollectionManagement.Models.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagementAPI.Controllers
{
    public class AuthController : BaseController
    {
        public AuthController(IMediator mediator)
            : base(mediator)
        {
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<string> Login([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }
    }
}
