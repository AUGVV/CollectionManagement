using CollectionManagement.Controllers;
using CollectionManagement.Handlers.Auth;
using CollectionManagement.Models.Auth;
using CollectionManagement.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagementAPI.Controllers
{
    public class AuthController : BaseController
    {
        private readonly IAuthContext authContext;

        public AuthController(IMediator mediator, IAuthContext authContext)
            : base(mediator)
        {
            this.authContext = authContext;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<TokensModel> Login([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [AllowAnonymous]
        [HttpPost("registration")]
        public async Task<TokensModel> Registration([FromBody] RegistrationHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<TokensModel> Refresh([FromBody] string refreshToken)
        {
            return await mediator.Send(new RefreshHandler.Request
            {
                RefreshToken = refreshToken
            });
        }

        [HttpPost("logout")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Logout()
        {
            await mediator.Send(new LogoutHandler.Request() 
            { 
                UserId = authContext.UserId
            });
            return new NoContentResult();
        }

        /* For emails
        [HttpPut("accept-invite/{acceptCode}/user/{userId}")]
        public async Task<string> AcceptInvite([FromRoute] string acceptCode)
        {
            return await Task.FromResult("ass"); //await mediator.Send();
        }
        */
    }
}
