using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class RemoveCollectionItemHandler
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
                var collection = await dataBaseContext.Collections
                    .SingleAsync(it => it.Id == request.ItemId, cancellationToken);

                dataBaseContext.Collections.Remove(collection);
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
