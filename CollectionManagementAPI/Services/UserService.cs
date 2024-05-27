using DataBaseMigrator.Context;
using DataBaseMigrator.Entity.Users.Types;
using Microsoft.EntityFrameworkCore;

namespace CollectionManagement.Services
{
    public class UserService(DataBaseContext context) : IUserService
    {
        private readonly DataBaseContext context = context;

        public async Task<bool> IsUserExists(long userId, CancellationToken cancellationToken)
        {
            if (userId == 0)
            {
                return false;
            }

            return await context.Users
                .Include(it => it.UserRoles)
                .AnyAsync(it => 
                    it.Id == userId 
                    && !it.UserRoles.Any(role => role.Role == SettingType.Blocked),
                    cancellationToken);
        }

        public async Task<bool> IsAnyUserExists(long userId, CancellationToken cancellationToken)
        {
            if (userId == 0)
            {
                return false;
            }

            return await context.Users
                .Include(it => it.UserRoles)
                .AnyAsync(it => it.Id == userId, cancellationToken);
        }

        public async Task<bool> IsRefreshTokenRelatedToUser(long userId, string token, CancellationToken cancellationToken)
        {
            return await context.Users
                .Include(it => it.UserRoles)
                .AnyAsync(it =>
                    it.Id == userId 
                    && it.RefreshToken.Equals(token)
                    && !it.UserRoles.Any(role => role.Role == SettingType.Blocked), 
                    cancellationToken);
        }

        public async Task<bool> IsUserUniqueByNickname(string nickname, CancellationToken cancellationToken)
        {
            var result = await context.Users.AnyAsync(it => it.Nickname.Equals(nickname), cancellationToken);
            return !result;
        }

        public async Task<bool> IsUserUniqueByEmail(string email, CancellationToken cancellationToken)
        {
            var result = await context.Users.AnyAsync(it => it.Email.Equals(email), cancellationToken);
            return !result;
        }

        public async Task<bool> IsUserExistsByCredentials(
            string email, 
            string password, 
            CancellationToken cancellationToken)
        {
            return await context.Users
                .Include(it => it.UserRoles)
                .AnyAsync(it => 
                    it.Email.Equals(email)
                    && it.Password.Equals(password)
                    && !it.UserRoles.Any(role => role.Role == SettingType.Blocked),
                    cancellationToken);
        }

        public async Task<bool> IsUserExistsByCredentials(
            long userId,
            string password,
            CancellationToken cancellationToken)
        {
            return await context.Users
                .Include(it => it.UserRoles)
                .AnyAsync(it =>
                    it.Id == userId
                    && it.Password.Equals(password),
                    cancellationToken);
        }
    }
}
