using CollectionManagement.Models.Collections;
using CollectionManagement.Models.Users;
using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class LoadCollectionItemsHandler
    {
        public class Request : IRequest<IEnumerable<GetCollectionModel>>
        {
            public string? Search { get; set; }

            public long? CollectionType { get; set; }

            public int FirstElement { get; set; } = 0;

            public int Count { get; set; } = 10;
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, IEnumerable<GetCollectionModel>>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<IEnumerable<GetCollectionModel>> Handle(Request request, CancellationToken cancellationToken)
            {

                var items = dataBaseContext.Collections
                    .Include(it => it.Creator)
                    .Include(it => it.Type)
                    .AsNoTracking();

                if (!string.IsNullOrWhiteSpace(request.Search))
                {
                    var search = request.Search.Replace("\\", "\\\\").Replace("_", "\\_").Replace("%", "\\%").Replace("[", "\\[").Trim();
                    items = items.Where(it => EF.Functions.Like(it.Title, $"%{search}%", "\\") || EF.Functions.Like(it.Description, $"%{search}%", "\\"));
                }

                if (request.CollectionType != null && request.CollectionType != 0)
                {
                    items = items.Where(it => it.Type.Id == request.CollectionType);
                }

                var result = await items
                    .OrderBy(it => it.CreatedAt)
                    .Skip(request.FirstElement)
                    .Take(request.Count)
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
                }).ToListAsync(cancellationToken);

                return result;
            }
        }
    }
}