using CollectionManagement.Models.Collections;
using DataBaseMigrator.Context;
using DataBaseMigrator.Entity.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace CollectionManagement.Handlers.Auth
{
    public class UpdateCollectionItemHandler
    {
        public class Request : AddCollectionModel, IRequest<Unit>
        {
            [JsonIgnore]
            public long UserId { get; set; }

            [JsonIgnore]
            public long ItemId { get; set; }
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, Unit>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var collectionItem = await dataBaseContext.Collections.SingleAsync(it => it.Id == request.ItemId, cancellationToken);

                collectionItem.Title = request.Title;
                collectionItem.Description = request.Description;
                collectionItem.CollectionTypeId = request.CollectionTypeId;

                await dataBaseContext.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}