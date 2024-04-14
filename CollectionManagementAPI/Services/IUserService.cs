namespace CollectionManagement.Services
{
    public interface IUserService
    {
        Task<bool> IsUserExists(long userId, CancellationToken cancellationToken);

        Task<bool> IsAnyUserExists(long userId, CancellationToken cancellationToken);

        Task<bool> IsRefreshTokenRelatedToUser(long userId, string token, CancellationToken cancellationToken);

        Task<bool> IsUserUniqueByNickname(string nickname, CancellationToken cancellationToken);

        Task<bool> IsUserUniqueByEmail(string email, CancellationToken cancellationToken);

        Task<bool> IsUserExistsByCredentials(
            string email,
            string password,
            CancellationToken cancellationToken);

        Task<bool> IsUserExistsByCredentials(
            long userId,
            string password,
            CancellationToken cancellationToken);
    }
}
