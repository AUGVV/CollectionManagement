using CollectionManagement.Models.Base;
using CollectionManagement.Models.Collections;
using CollectionManagement.Models.Users;
using DataBaseMigrator.Context;
using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace CollectionManagement.Handlers.Auth
{
    public class GetCollectionItemsHandler
    {
        public class Request : IRequest<Paginator<GetCollectionModel>>
        {
            [BindNever]
            public long? UserId { get; set; }

            [BindNever]
            public bool IsTop { get; set; } = false;

            public string? Search { get; set; }

            public long? CollectionType { get; set; }

            public int PageNumber { get; set; } = 1;
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, Paginator<GetCollectionModel>>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<Paginator<GetCollectionModel>> Handle(Request request, CancellationToken cancellationToken)
            {
                const int pageSize = 10;
                const int topSize = 5;
                var count = topSize;

                var collectionType = dataBaseContext.Collections
                    .Include(it => it.Creator)
                    .Include(it => it.Type)
                    .AsNoTracking();

                collectionType = request.UserId != null 
                    ? collectionType
                        .Where(it => it.CreatorId == request.UserId)
                        .OrderBy(it => it.CreatedAt)
                    :  collectionType
                        .OrderByDescending(it => it.LikesCount);

                if (!request.IsTop && request.UserId == null)
                {
                    collectionType = collectionType.Skip(topSize);
                }

                if (!string.IsNullOrWhiteSpace(request.Search))
                {
                    var search = request.Search.Replace("\\", "\\\\").Replace("_", "\\_").Replace("%", "\\%").Replace("[", "\\[").Trim();
                    collectionType = collectionType.Where(it => EF.Functions.Like(it.Title, $"%{search}%", "\\") || EF.Functions.Like(it.Description, $"%{search}%", "\\"));
                }

                if (request.CollectionType != null && request.CollectionType != 0)
                {
                    collectionType = collectionType.Where(it => it.Type.Id == request.CollectionType);
                }

                if (request.IsTop)
                {
                    collectionType = collectionType.Take(topSize);
                }
                else
                {
                    count = await collectionType.CountAsync(cancellationToken);
                }

                collectionType = collectionType.Skip((request.PageNumber - 1) * pageSize).Take(pageSize);

                var result = collectionType.Select(it => new GetCollectionModel
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
                });

                return new Paginator<GetCollectionModel>
                {
                    Items = await result.ToListAsync(cancellationToken),
                    Total = count
                };
            }
        }
    }
}