namespace DataBaseMigrator.Entity.Elements
{
    public class Element : BaseEntity<long>
    {
        public long CollectionId { get; set; }

        public DateTime CreatedAt { get; set; }

        public string Description { get; set; }

        public ICollection<Part> Parts { get; set; }

        public ICollection<Tag> Tags { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
