using DataBaseMigrator.Entity.Users.Types;

namespace CollectionManagement.Models.Users
{
    public class GetUser
    {
        public long UserId { get; set; }

        public string Nickname { get; set; }

        public string Email { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsVerified { get; set; }

        public SettingType Role { get; set; }

        public string Language { get; set; }

        public string Theme { get; set; }
    }
}
