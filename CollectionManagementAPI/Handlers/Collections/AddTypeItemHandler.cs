using CollectionManagement.Models.Collections;
using DataBaseMigrator.Context;
using DataBaseMigrator.Entity.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Auth
{
    public class AddTypeItemHandler
    {
        public class Request : AddTypeModel, IRequest<Unit>
        {
        }

        public class Handler(DataBaseContext dataBaseContext) : IRequestHandler<Request, Unit>
        {
            private readonly DataBaseContext dataBaseContext = dataBaseContext;

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var type = new CollectionType
                {
                    Name = request.Name
                };

                await dataBaseContext.CollectionTypes.AddAsync(type, cancellationToken);
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
