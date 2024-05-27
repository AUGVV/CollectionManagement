using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class RemoveTypeItemHandler
    {
        public class Request : IRequest<Unit>
        {
            public long UserId { get; set; }

            public long ItemId { get; set; }
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, Unit>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var type = await dataBaseContext.CollectionTypes
                    .SingleAsync(it => it.Id == request.ItemId, cancellationToken);

                dataBaseContext.CollectionTypes.Remove(type);
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
