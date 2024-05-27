import { action, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import TypeItemsModel from "../Models/TypeItemsModel";

export class CollectionTypesStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    types: TypeItemsModel[] = [];

    @action
    async GetTypes(): Promise<void> {
        const response = await fetch(`${ApiRoutes.Collections.GetTypes}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
        })

        if (response.status === 200) {
            this.types = await response.json() as TypeItemsModel[];
        }
    }
}

export const collectionTypesStore = new CollectionTypesStore();