using DataBaseMigrator.Entity.Users.Types;

namespace DataBaseMigrator.Entity.Users
{
    public class UserRole : BaseEntity<long>
    {
        public long UserId { get; set; }

        public virtual User User { get; set; } = null!;

        public SettingType Role { get; set; }
    }
}
