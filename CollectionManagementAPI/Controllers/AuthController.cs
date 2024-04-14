using CollectionManagement.Controllers;
using CollectionManagement.Handlers.Auth;
using CollectionManagement.Models.Auth;
using CollectionManagement.Models.Base;
using CollectionManagement.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagementAPI.Controllers
{
    public class AuthController(IMediator mediator, IAuthContext authContext) : BaseController(mediator)
    {
        private readonly IAuthContext authContext = authContext;

        /// <summary>
        /// Login user.
        /// </summary>
        /// <param name="request">Request.</param>
        /// <returns>Access and refresh tokens.</returns>
        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType(typeof(TokensModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<TokensModel> Login([FromBody] LoginHandler.Request request)
        {
            return await Mediator.Send(request);
        }

        /// <summary>
        /// User registration in the application.
        /// </summary>
        /// <param name="request">Request.</param>
        /// <returns>Access and refresh tokens.</returns>
        [AllowAnonymous]
        [HttpPost("registration")]
        [ProducesResponseType(typeof(TokensModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
        public async Task<TokensModel> Registration([FromBody] RegistrationHandler.Request request)
        {
            return await Mediator.Send(request);
        }

        /// <summary>
        /// Token refresh when access expired.
        /// </summary>
        /// <param name="refreshToken">Refresh token.</param>
        /// <returns>Access and refresh tokens.</returns>
        [AllowAnonymous]
        [HttpPost("refresh")]
        [ProducesResponseType(typeof(TokensModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<TokensModel> Refresh([FromBody] string refreshToken)
        {
            return await Mediator.Send(new RefreshHandler.Request
            {
                RefreshToken = refreshToken
            });
        }

        /// <summary>
        /// Logout from application.
        /// </summary>
        /// <returns>NoContent 204</returns>
        [HttpPost("logout")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Logout()
        {
            await Mediator.Send(new LogoutHandler.Request() 
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
