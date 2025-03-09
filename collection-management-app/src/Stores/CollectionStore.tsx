import { action, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import { Headers } from "../Constants/Headers";
import CollectionModel from "../Models/CollectionModel";
import axios from "axios";

export class CollectionStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    collection: CollectionModel | undefined;

    @action
    async GetCollections(collectionId: number): Promise<void> {
        console.log(`${ApiRoutes.Collections.GetCollection(collectionId)}`);

        const response = await axios.get<CollectionModel>(
            `${ApiRoutes.Collections.GetCollection(collectionId)}`,
            {
                headers: Headers.HeadersWithoutAuth
            },
        );

        if (response.status === 200) {
            this.collection = response.data;
        }
        else if (response.status === 404) {
            window.location.replace("/");
        }
    }
}

export const collectionStore = new CollectionStore();