using DataBaseMigrator.Entity.Users.Types;

namespace DataBaseMigrator.Entity.Users
{
    public class UserRole : BaseEntity<long>
    {
        public long UserId { get; set; }

        public RoleType ConfigType { get; set; }
    }
}
