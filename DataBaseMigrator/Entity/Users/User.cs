namespace DataBaseMigrator.Entity.Users
{
    public class User : BaseEntity<long>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime Birth { get; set; }

        public DateTime CreationDate { get; set; }

        public string RefreshToken { get; set; }

        public DateTime RefreshTokenExpirationDate { get; set; }

        public bool IsVerified { get; set; }

        public string VerificationCode { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }

        public ICollection<UserConfig> UserConfig { get; set; }
    }
}
