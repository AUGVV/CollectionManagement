using CollectionManagement.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManagementAPI.Controllers
{
    public class ElementsController : BaseController
    {
        public ElementsController(IMediator mediator)
            : base(mediator)
        {
        }

    }
}
