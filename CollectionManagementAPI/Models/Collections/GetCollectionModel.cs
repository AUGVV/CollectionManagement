using CollectionManagement.Models.Users;

namespace CollectionManagement.Models.Collections
{
    public class GetCollectionModel
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public long LikesCount { get; set; }

        public long CommentsCount { get; set; }

        public GetUserLightModel Creator { get; set; }

        public string CollectionType { get; set; }
    }
}
