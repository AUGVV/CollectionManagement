using CollectionManagement.Models.Tags;
using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class GetPopularTagsHandler
    {
        public class Request : IRequest<IEnumerable<TagModel>>
        {
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, IEnumerable<TagModel>>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<IEnumerable<TagModel>> Handle(Request request, CancellationToken cancellationToken)
            {
                return await dataBaseContext.Tags
                    .AsNoTracking()
                    .OrderByDescending(it => it.Count)
                    .Take(20)
                    .Select(it => new TagModel { Id = it.Id, Value = it.Value })
                    .ToListAsync(cancellationToken); ;
            }
        }
    }
}