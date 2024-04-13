namespace CollectionManagement.Services
{
    public interface IUserService
    {
        Task<bool> IsUserExists(long userId, CancellationToken cancellationToken);

        Task<bool> IsRefreshTokenRelatedToUser(long userId, string token, CancellationToken cancellationToken);

        Task<bool> IsUserExistsByNickname(string nickname, CancellationToken cancellationToken);

        Task<bool> IsUserExistsByEmail(string email, CancellationToken cancellationToken);

        Task<bool> IsUserExistsByCredentials(
            string email,
            string password,
            CancellationToken cancellationToken);
    }
}
