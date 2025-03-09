using CollectionManagement.Models.Tags;
using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class GetSuggestedTagsHandler
    {
        public class Request : IRequest<IEnumerable<TagModel>>
        {
            public string Tag { get; set; }
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, IEnumerable<TagModel>>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<IEnumerable<TagModel>> Handle(Request request, CancellationToken cancellationToken)
            {
                var tags = dataBaseContext.Tags.AsNoTracking();
                if (!string.IsNullOrWhiteSpace(request.Tag))
                {
                    var search = request.Tag.Replace("\\", "\\\\").Replace("_", "\\_").Replace("%", "\\%").Replace("[", "\\[").Trim();
                    tags = tags.Where(it => EF.Functions.Like(it.Value, $"{search}%", "\\"));
                }

                return await tags
                    .Take(20)
                    .Select(it => new TagModel { Id = it.Id, Value = it.Value })
                    .ToListAsync(cancellationToken);
            }
        }
    }
}