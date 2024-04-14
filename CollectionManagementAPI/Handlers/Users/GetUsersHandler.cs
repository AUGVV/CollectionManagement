using AutoMapper;
using CollectionManagement.Models.Base;
using CollectionManagement.Models.Users;
using DataBaseMigrator.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Users
{
    public class GetUsersHandler
    {
        public class Request : IRequest<Paginator<GetUser>>
        {
            public string? Search {  get; set; }

            public int PageNumber { get; set; } = 1;
        }

        public class Handler : IRequestHandler<Request, Paginator<GetUser>>
        {
            private readonly DataBaseContext dataBaseContext;
            private readonly IMapper mapper;

            public Handler(DataBaseContext dataBaseContext, IMapper mapper)
            {
                this.dataBaseContext = dataBaseContext;
                this.mapper = mapper;
            }

            public async Task<Paginator<GetUser>> Handle(Request request, CancellationToken cancellationToken)
            {
                const int pageSize = 10;

                var user = dataBaseContext.Users
                    .Include(it => it.UserRoles)
                    .Include(it => it.UserConfig)
                    .AsNoTracking();

                if (!string.IsNullOrWhiteSpace(request.Search))
                {
                    var search = request.Search.Replace("\\", "\\\\").Replace("_", "\\_").Replace("%", "\\%").Replace("[", "\\[").Trim();
                    user = user.Where(it => EF.Functions.Like(it.Nickname, $"%{search}%", "\\"));
                }

                var count = await user.CountAsync(cancellationToken);

                user = user.Skip((request.PageNumber - 1) * pageSize).Take(pageSize);

                return new Paginator<GetUser>
                {
                    Items = mapper.Map<List<GetUser>>(await user.ToListAsync(cancellationToken)),
                    Total = count
                };
            }
        }
    }
}
