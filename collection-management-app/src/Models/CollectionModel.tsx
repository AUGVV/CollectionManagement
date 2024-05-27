import UserLookupModel from "./UserLookupModel";

class CollectionModel {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    likesCount: number;
    commentsCount: number;
    creator: UserLookupModel;
    collectionType: string;

    constructor(
        id: number,
        title: string,
        description: string,
        imageUrl: string,
        likesCount: number,
        commentsCount: number,
        creator: UserLookupModel,
        collectionType: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
        this.creator = creator;
        this.collectionType = collectionType;
    }
}

export default CollectionModel;