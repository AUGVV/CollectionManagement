using CollectionManagement.Controllers;
using CollectionManagement.Handlers.Auth;
using CollectionManagement.Models.Tags;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagementAPI.Controllers
{
    public class TagsController(IMediator mediator) : BaseController(mediator)
    {
        [AllowAnonymous]
        [HttpGet("get-suggested-tags/{tag}")]
        public async Task<IEnumerable<TagModel>> GetSuggestedTags([FromRoute] string tag)
        {
            return await Mediator.Send(new GetSuggestedTagsHandler.Request
            {
                Tag = tag
            });
        }

        [AllowAnonymous]
        [HttpGet("get-popular-tags")]
        public async Task<IEnumerable<TagModel>> GetPopularTag() => 
            await Mediator.Send(new GetPopularTagsHandler.Request());
    }
}
