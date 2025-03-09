using DataBaseMigrator.Entity.Collections;
using DataBaseMigrator.Entity.Elements;

namespace DataBaseMigrator.Entity.Tags
{
    public class CollectionTag
    {
        public long TagId { get; set; }

        public Tag Tag { get; set; }

        public long CollectionId { get; set; }

        public Collection Collection { get; set; }
    }
}
