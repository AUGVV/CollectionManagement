using DataBaseMigrator.Context;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Services
{
    public class UserService : IUserService
    {
        private readonly DataBaseContext context;

        public UserService(DataBaseContext context)
        {
            this.context = context;
        }

        public async Task<bool> IsUserExists(long userId, CancellationToken cancellationToken)
        {
            if (userId == 0)
            {
                return false;
            }

            return await context.Users.AnyAsync(it => it.Id == userId, cancellationToken);
        }

        public async Task<bool> IsRefreshTokenRelatedToUser(long userId, string token, CancellationToken cancellationToken)
        {
            return await context.Users.AnyAsync(it => it.Id == userId && it.RefreshToken == token, cancellationToken);
        }

        public async Task<bool> IsUserExistsByNickname(string nickname, CancellationToken cancellationToken)
        {
            return await context.Users.AnyAsync(it => it.Nickname == nickname, cancellationToken);
        }

        public async Task<bool> IsUserExistsByEmail(string email, CancellationToken cancellationToken)
        {
            return await context.Users.AnyAsync(it => it.Email == email, cancellationToken);
        }

        public async Task<bool> IsUserExistsByCredentials(
            string email, 
            string password, 
            CancellationToken cancellationToken)
        {
            return await context.Users.AnyAsync(it => it.Email == email && it.Password == password, cancellationToken);
        }
    }
}
