using DataBaseMigrator.Entity.Collections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataBaseMigrator.Context.Configs.Collections
{
    public class CollectionTypeConfigs : IEntityTypeConfiguration<CollectionType>
    {
        public void Configure(EntityTypeBuilder<CollectionType> builder)
        {
        }
    }
}
