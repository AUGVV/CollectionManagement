import { action, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import CollectionModel from "../Models/CollectionModel";

export class CollectionStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    collection: CollectionModel | undefined;

    @action
    async GetCollectuons(collectionId: number): Promise<void> {
        console.log(`${ApiRoutes.Collections.GetCollection(collectionId)}`);
        const response = await fetch(`${ApiRoutes.Collections.GetCollection(collectionId)}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
        })

        if (response.status === 200) {
            this.collection = await response.json() as CollectionModel;
        }
        else if (response.status === 404) {
            window.location.replace("/");
        }
    }
}

export const collectionStore = new CollectionStore();