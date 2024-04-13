using Microsoft.EntityFrameworkCore;
using DataBaseMigrator.Entity.Users.Types;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DataBaseMigrator.Entity.Users;

namespace DataBaseMigrator.Context.Configs.Users
{
    public class UserRoleConfigs : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.Property(it => it.Role)
                .IsRequired()
                .HasDefaultValue(RoleType.User);
        }
    }
}
