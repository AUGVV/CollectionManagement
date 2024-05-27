using CollectionManagement.Attributes;
using CollectionManagement.Controllers;
using CollectionManagement.Handlers.Auth;
using CollectionManagement.Models.Base;
using CollectionManagement.Models.Collections;
using CollectionManagement.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagementAPI.Controllers
{
    public class CollectionsController(IMediator mediator, IAuthContext authContext) : BaseController(mediator)
    {
        private readonly IAuthContext authContext = authContext;

        [HttpPost("add-collection-item")]
        public async Task<IActionResult> AddCollectionItem([FromBody] AddCollectionItemHandler.Request request)
        {
            request.UserId = authContext.UserId;
            await Mediator.Send(request);
            return new NoContentResult();
        }

        [HttpPost("update-collection-item/{itemId}")]
        public async Task<IActionResult> UpdateCollectionItem(
            [FromBody] UpdateCollectionItemHandler.Request request,
            [FromRoute] long itemId)
        {
            request.ItemId = itemId;
            request.UserId = authContext.UserId;
            await Mediator.Send(request);
            return new NoContentResult();
        }

        [IsAdmin]
        [HttpPost("update-collection-item/{itemId}/User/{userId}")]
        public async Task<IActionResult> UpdateCollectionItem(
            [FromBody] UpdateCollectionItemHandler.Request request,
            [FromRoute] long itemId,
            [FromRoute] long userId)
        {
            request.ItemId = itemId;
            request.UserId = userId;
            await Mediator.Send(request);
            return new NoContentResult();
        }

        [HttpDelete("remove-collection-item/{itemId}")]
        public async Task<IActionResult> RemoveCollectionItem([FromRoute] long itemId)
        {
            await Mediator.Send(new RemoveCollectionItemHandler.Request 
            { 
                ItemId = itemId,
                UserId = authContext.UserId
            });
            return new NoContentResult();
        }

        [IsAdmin]
        [HttpDelete("remove-collection-item/{itemId}/user/{userId}")]
        public async Task<IActionResult> RemoveCollectionItem(
            [FromRoute] long itemId,
            [FromRoute] long userId)
        {
            await Mediator.Send(new RemoveCollectionItemHandler.Request
            {
                ItemId = itemId,
                UserId = userId
            });
            return new NoContentResult();
        }

        [AllowAnonymous]
        [HttpGet("get-top-collection-items")]
        public async Task<Paginator<GetCollectionModel>> GetTopCollectionItems()
        {
            return await Mediator.Send(new GetCollectionItemsHandler.Request
            {
                UserId = null,
                IsTop = true
            });
        }

        [AllowAnonymous]
        [HttpGet("get-collection-items")]
        public async Task<Paginator<GetCollectionModel>> GetCollectionItems([FromQuery] GetCollectionItemsHandler.Request request)
        {
            request.UserId = null;
            return await Mediator.Send(request);
        }

        [HttpGet("get-user-collection-items")]
        public async Task<Paginator<GetCollectionModel>> GetUserCollectionItems([FromQuery] GetCollectionItemsHandler.Request request)
        {
            request.UserId = authContext.UserId;
            return await Mediator.Send(request);
        }

        [HttpGet("get-collection-items/{userId}")]
        public async Task<Paginator<GetCollectionModel>> GetCollectionItems(
            [FromRoute] long userId,
            [FromQuery] GetCollectionItemsHandler.Request request)
        {
            request.UserId = userId;
            return await Mediator.Send(request);
        }

        [AllowAnonymous]
        [HttpGet("get-collection-item/{collectionId}")]
        public async Task<GetCollectionModel> GetCollectionItem([FromRoute] long collectionId)
        {
            return await Mediator.Send(new GetCollectionItemHandler.Request
            {
                CollectionId = collectionId,
                UserId = authContext.UserId
            });
        }

        [IsAdmin]
        [HttpGet("get-collection-item/{collectionId}/user/{userId}")]
        public async Task<GetCollectionModel> GetAdminCollectionItem([FromRoute] long collectionId, [FromRoute] long userId)
        {
            return await Mediator.Send(new GetCollectionItemHandler.Request
            {
                CollectionId = collectionId,
                UserId = userId
            });
        }

        [AllowAnonymous]
        [HttpGet("get-type-items")]
        public async Task<IEnumerable<GetTypeModel>> GetTypeItems()
        {
            return await Mediator.Send(new GetTypesHandler.Request());
        }

        [IsAdmin]
        [HttpPut("add-type-item")]
        public async Task<IActionResult> AddTypeItem([FromBody] AddTypeItemHandler.Request request)
        {
            await Mediator.Send(request);
            return new NoContentResult();
        }

        [IsAdmin]
        [HttpDelete("remove-type-item/{itemId}")]
        public async Task<IActionResult> RemoveTypeItem([FromRoute] long itemId)
        {
            await Mediator.Send(new RemoveCollectionItemHandler.Request
            {
                ItemId = itemId,
                UserId = authContext.UserId
            });
            return new NoContentResult();
        }
    }
}
