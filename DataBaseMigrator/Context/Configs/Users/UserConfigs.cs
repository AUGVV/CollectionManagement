using DataBaseMigrator.Constants;
using DataBaseMigrator.Entity.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataBaseMigrator.Context.Configs.Users
{
    public class UserConfigs : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(it => it.Nickname)
                .IsRequired()
                .HasMaxLength(FieldConstants.NameFieldsLength);

            builder.Property(it => it.Email)
                .IsRequired()
                .HasMaxLength(FieldConstants.MaxTextLength);


            builder.Property(it => it.Password)
                .HasMaxLength(FieldConstants.MaxTextLength)
                .IsRequired();

            builder.Property(it => it.RefreshToken)
                .IsRequired(false)
                .HasMaxLength(FieldConstants.MaxTextLength);

            builder.Property(it => it.IsVerified)
                .IsRequired();

            builder.Property(it => it.VerificationCode)
                .IsRequired(false)
                .HasMaxLength(FieldConstants.MaxTextLength);

            builder.HasIndex(it => it.Nickname).IsUnique();
            builder.HasIndex(it => it.Password);
            builder.HasIndex(it => it.Email).IsUnique();
        }
    }
}
