using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DataBaseMigrator.Entity.Users;
using DataBaseMigrator.Entity.Users.Types;

namespace DataBaseMigrator.Context.Configs.Users
{
    public class UserRoleConfigs : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.Property(it => it.Role)
                .IsRequired()
                .HasDefaultValue(SettingType.User);
        }
    }
}
