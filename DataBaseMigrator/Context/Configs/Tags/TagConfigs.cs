using DataBaseMigrator.Constants;
using DataBaseMigrator.Entity.Elements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace DataBaseMigrator.Context.Configs.Tags
{
    public class TagConfigs : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            builder.Property(it => it.Value)
                .IsRequired()
                .HasMaxLength(FieldConstants.TagFieldsLength);

            builder.HasIndex(it => it.Value).HasDatabaseName("IX_tag_value");
            builder.HasIndex(it => it.Count).HasDatabaseName("IX_tag_count");
        }
    }
}
