using DataBaseMigrator.Constants;
using DataBaseMigrator.Entity.Elements;
using DataBaseMigrator.Entity.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataBaseMigrator.Context.Configs.Elements
{
    public class ElementConfigs : IEntityTypeConfiguration<Element>
    {
        public void Configure(EntityTypeBuilder<Element> builder)
        {
        }
    }
}
