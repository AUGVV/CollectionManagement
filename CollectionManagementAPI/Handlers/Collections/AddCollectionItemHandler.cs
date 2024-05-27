using CollectionManagement.Models.Collections;
using DataBaseMigrator.Context;
using DataBaseMigrator.Entity.Collections;
using MediatR;
using System.Text.Json.Serialization;

namespace CollectionManagement.Handlers.Auth
{
    public class AddCollectionItemHandler
    {
        public class Request : AddCollectionModel, IRequest<Unit>
        {
            [JsonIgnore]
            public long UserId { get; set; }
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, Unit>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var collection = new Collection
                {
                    CommentsCount = 0,
                    LikesCount = 0,
                    CreatedAt = DateTime.UtcNow,
                    ImageUrl = null,
                    Title = request.Title,
                    Description = request.Description,
                    CollectionTypeId = request.CollectionTypeId,
                    CreatorId = request.UserId,
                    IsPrivate = false
                };

                await dataBaseContext.Collections.AddAsync(collection, cancellationToken);
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
