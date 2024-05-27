using AutoMapper;
using CollectionManagement.Models.Users;
using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace CollectionManagement.Handlers.Users
{
    public class UpdateUserMetadataHandler
    {
        public class Request : UpdateUser, IRequest<GetUser>
        {
            [JsonIgnore]
            public long UserId { get; set; }
        }

        public class Handler : IRequestHandler<Request, GetUser>
        {
            private readonly DataBaseContext dataBaseContext;
            private readonly IMapper mapper;

            public Handler(DataBaseContext dataBaseContext, IMapper mapper)
            {
                this.dataBaseContext = dataBaseContext;
                this.mapper = mapper;
            }

            public async Task<GetUser> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await dataBaseContext.Users
                    .Include(it => it.UserRoles)
                    .Include(it => it.UserConfig)
                    .SingleAsync(it => it.Id == request.UserId, cancellationToken);

                user.Nickname = request.Nickname;
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return mapper.Map<GetUser>(user);
            }
        }
    }
}
