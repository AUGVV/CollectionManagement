using DataBaseMigrator.Entity.Elements;
using DataBaseMigrator.Entity.Users;

namespace DataBaseMigrator.Entity.Collections
{
    public class Collection : BaseEntity<long>
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public long CreatorId { get; set; }    
        
        public long Likes { get; set; }

        public User Creator { get; set; }

        public long CollectionTypeId { get; set; }

        public CollectionType Type { get; set; }

        public ICollection<UserConfig> UserConfig { get; set; }

        public ICollection<Element> Elements { get; set; }
    }
}
