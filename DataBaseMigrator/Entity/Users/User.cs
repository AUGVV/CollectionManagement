namespace DataBaseMigrator.Entity.Users
{
    public class User : BaseEntity<long>
    {
        public string Nickname { get; set; } = null!;

        public string Email { get; set; }

        public string Password { get; set; }

        public DateTime CreationDate { get; set; }

        public string RefreshToken { get; set; } = null!;

        public bool IsVerified { get; set; }

        public string VerificationCode { get; set; } = null!;

        public ICollection<UserRole> UserRoles { get; set; } = [];

        public ICollection<UserConfig> UserConfig { get; set; } = [];
    }
}
