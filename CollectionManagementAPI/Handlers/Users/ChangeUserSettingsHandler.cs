﻿using DataBaseMigrator.Context;
using DataBaseMigrator.Entity.Users.Types;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Handlers.Users
{
    public class ChangeUserSettingsHandler
    {
        public class Request : IRequest<Unit>
        {
            public long UserId { get; set; }

            public ConfigType ConfigType { get; set; }

            public string Value { get; set; }
        }

        public class Handler : IRequestHandler<Request, Unit>
        {
            private readonly DataBaseContext dataBaseContext;

            public Handler(DataBaseContext dataBaseContext)
            {
                this.dataBaseContext = dataBaseContext;
            }

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await dataBaseContext.Users
                    .Include(it => it.UserConfig)
                    .SingleAsync(it => it.Id == request.UserId, cancellationToken);

                var setting = user.UserConfig.Single(it => it.ConfigType == request.ConfigType);
                setting.Value = request.Value;
                await dataBaseContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
