using DataBaseMigrator.Entity.Users.Types;

namespace DataBaseMigrator.Entity.Users
{
    public class UserConfig : BaseEntity<long>
    {
        public long UserId { get; set; }

        public virtual User User { get; set; } = null!;

        public ConfigType ConfigType { get; set; }

        public string Value { get; set; }
    }
}
