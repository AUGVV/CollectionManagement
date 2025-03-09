using DataBaseMigrator.Entity.Tags;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace DataBaseMigrator.Context.Configs.Tags
{
    public class CollectionTagConfigs : IEntityTypeConfiguration<CollectionTag>
    {
        public void Configure(EntityTypeBuilder<CollectionTag> builder)
        {
            builder.HasKey(it => new { it.CollectionId, it.TagId });

            builder
                .HasOne(it => it.Collection)
                .WithMany(it => it.Tags)
                .HasForeignKey(it => it.CollectionId);

            builder
                .HasOne(it => it.Tag)
                .WithMany(it => it.CollectionTags)
                .HasForeignKey(it => it.TagId);
        }
    }
}
