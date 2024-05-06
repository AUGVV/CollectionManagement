using DataBaseMigrator.Constants;
using DataBaseMigrator.Entity.Collections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataBaseMigrator.Context.Configs.Collections
{
    public class CollectionConfigs : IEntityTypeConfiguration<Collection>
    {
        public void Configure(EntityTypeBuilder<Collection> builder)
        {
            builder.Property(it => it.Title)
                .IsRequired()
                .HasMaxLength(FieldConstants.TitleFieldsLength);
            
            builder.Property(it => it.Description)
                .IsRequired()
                .HasMaxLength(FieldConstants.DescriptionFieldsLength);

            builder.HasOne(it => it.Creator)
                .WithMany()
                .HasForeignKey(u => u.CreatorId)
                .IsRequired();

            builder.HasOne(it => it.Type)
                .WithMany()
                .HasForeignKey(u => u.CollectionTypeId)
                .IsRequired();

            builder.Property(it => it.ImageUrl)
                .IsRequired(false);

            builder.HasIndex(it => it.Title);
            builder.HasIndex(it => it.Description);
        }
    }
}
