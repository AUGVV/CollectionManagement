namespace CollectionManagement.Models.Base
{
    public class Paginator<T>
    {
        public List<T> Items { get; set; }

        public long Total { get; set; }
    }
}
