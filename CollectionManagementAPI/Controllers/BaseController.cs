using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagement.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("[controller]")]
    public class BaseController : ControllerBase
    {
        internal BaseController(IMediator mediator)
        {
            this.Mediator = mediator;
        }

        internal IMediator Mediator { get; }
    }
}
