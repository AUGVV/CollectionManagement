using CollectionManagement.Models.Collections;
using CollectionManagement.Models.Users;
using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class GetCollectionItemHandler
    {
        public class Request : IRequest<GetCollectionModel>
        {
            public long UserId { get; set; }

            public long CollectionId { get; set; }
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, GetCollectionModel>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<GetCollectionModel> Handle(Request request, CancellationToken cancellationToken)
            {
                var collectionType = await dataBaseContext.Collections
                    .Where(it => it.Id == request.CollectionId)
                    .Select(it => new GetCollectionModel
                    {
                        Id = it.Id,
                        Title = it.Title,
                        Description = it.Description,
                        CommentsCount = it.CommentsCount,
                        ImageUrl = it.ImageUrl,
                        LikesCount = it.LikesCount,
                        Creator = new GetUserLightModel
                        {
                            UserId = it.Creator.Id,
                            Nickname = it.Creator.Nickname
                        },
                        CollectionType = it.Type.Name
                    }).SingleAsync(cancellationToken);

                return collectionType;
            }
        }
    }
}