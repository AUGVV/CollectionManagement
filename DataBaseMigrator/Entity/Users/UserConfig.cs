using DataBaseMigrator.Entity.Users.Types;

namespace DataBaseMigrator.Entity.Users
{
    public class UserConfig : BaseEntity<long>
    {
        public long UserId { get; set; }

        public ConfigType ConfigType { get; set; }

        public string Value { get; set; }
    }
}
