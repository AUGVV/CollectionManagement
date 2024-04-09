using CollectionManagement.Controllers;
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
    }
}
