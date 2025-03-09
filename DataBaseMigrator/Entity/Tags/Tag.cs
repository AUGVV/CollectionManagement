using DataBaseMigrator.Entity.Tags;

namespace DataBaseMigrator.Entity.Elements
{
    public class Tag : BaseEntity<long>
    {
        public string Value { get; set; }

        public string Count { get; set; }

        public ICollection<CollectionTag> CollectionTags { get; set; } = [];
    }
}
