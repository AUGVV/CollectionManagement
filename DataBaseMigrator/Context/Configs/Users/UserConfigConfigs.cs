using DataBaseMigrator.Constants;
using DataBaseMigrator.Entity.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataBaseMigrator.Context.Configs.Users
{
    public class UserConfigConfigs : IEntityTypeConfiguration<UserConfig>
    {
        public void Configure(EntityTypeBuilder<UserConfig> builder)
        {
            builder.Property(it => it.ConfigType)
                .IsRequired();

            builder.Property(it => it.Value)
                .HasMaxLength(FieldConstants.NameFieldsLength)
                .IsRequired();
        }
    }
}
