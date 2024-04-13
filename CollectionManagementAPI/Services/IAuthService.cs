namespace CollectionManagement.Services
{
    public interface IAuthService
    {
        string CreateJwtToken(long userId, bool isRefresh = false);

        bool ValidateJwtToken(string token, bool isRefresh = false);

        long GetTokenUserId(string token);
    }
}
