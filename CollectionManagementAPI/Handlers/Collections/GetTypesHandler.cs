using CollectionManagement.Models.Collections;
using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class GetTypesHandler
    {
        public class Request : AddTypeModel, IRequest<IEnumerable<GetTypeModel>>
        {
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, IEnumerable<GetTypeModel>>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<IEnumerable<GetTypeModel>> Handle(Request request, CancellationToken cancellationToken)
            {
                var collectionTypes = await dataBaseContext.CollectionTypes.Select(it => new GetTypeModel
                {
                    Id = it.Id,
                    Name = it.Name,
                }).ToListAsync(cancellationToken);

                return collectionTypes;
            }
        }
    }
}
