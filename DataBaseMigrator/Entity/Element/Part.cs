using DataBaseMigrator.Entity.Users.Types;

namespace DataBaseMigrator.Entity.Elements
{
    public class Part : BaseEntity<long>
    {
        public long PartId { get; set; }

        public PartType Type { get; set; }

        public string Title { get; set; }

        public string Value { get; set; }
    }
}
