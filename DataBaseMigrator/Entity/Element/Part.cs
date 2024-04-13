using DataBaseMigrator.Entity.Users;
using DataBaseMigrator.Entity.Users.Types;

namespace DataBaseMigrator.Entity.Elements
{
    public class Part : BaseEntity<long>
    {
        public long ElementId { get; set; }

        public virtual Element Element { get; set; } = null!;

        public PartType Type { get; set; }

        public string Title { get; set; }

        public string Value { get; set; }
    }
}
