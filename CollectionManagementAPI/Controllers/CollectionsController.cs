using CollectionManagement.Controllers;
using CollectionManagement.Handlers.Auth;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagementAPI.Controllers
{
    public class CollectionsController : BaseController
    {
        public CollectionsController(IMediator mediator)
            : base(mediator)
        {
        }

        /*
        [HttpPost("add-collection-item")]
        public async Task<string> AddCollectionItem([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [HttpPost("update-collection-item")]
        public async Task<string> UpdateCollectionItem([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [HttpDelete("remove-collection-item")]
        public async Task<string> RemoveCollectionItem([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [HttpGet("get-collection-items")]
        public async Task<string> GetCollectionItems([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }

        [HttpGet("get-collection-item")]
        public async Task<string> GetCollectionItem([FromBody] LoginHandler.Request request)
        {
            return await mediator.Send(request);
        }
        */
    }
}
