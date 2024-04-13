using DataBaseMigrator.Entity.Users;

namespace DataBaseMigrator.Entity.Elements
{
    public class Comment : BaseEntity<long>
    {
        public long ElementId { get; set; }

        public virtual Element Element { get; set; } = null!;

        public string Text { get; set; }

        public long AuthorId { get; set; }

        public User Author { get; set; }

        public DateTime CreationTime { get; set; }

        public long Position { get; set; }

        public long Likes { get; set; }

        public bool IsBlocked { get; set; }
    }
}
