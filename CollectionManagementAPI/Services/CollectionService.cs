using DataBaseMigrator.Context;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Services
{

    public class CollectionService(DataBaseContext context) : ICollectionService
    {
        private readonly DataBaseContext context = context;

        public Task<bool> IsCollectionTypeExist(long typeId, CancellationToken cancellationToken) => 
            context.CollectionTypes.AnyAsync(it => it.Id == typeId, cancellationToken);

        public Task<bool> IsUserCollectionCreator(long collectionId, long userId, CancellationToken cancellationToken) =>
            context.Collections.AnyAsync(it => it.Id == collectionId && it.CreatorId == userId, cancellationToken);
    }
}
