namespace CollectionManagement.Services
{
    public interface ICollectionService
    {
        Task<bool> IsCollectionTypeExist(long typeId, CancellationToken cancellationToken);

        Task<bool> IsUserCollectionCreator(long collectionId, long userId, CancellationToken cancellationToken);
    }
}
