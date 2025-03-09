import { action, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import { Headers } from "../Constants/Headers";
import TypeItemsModel from "../Models/TypeItemsModel";
import axios from "axios";

export class CollectionTypesStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    types: TypeItemsModel[] = [];

    @action
    async GetTypes(): Promise<void> {

        const response = await axios.get<TypeItemsModel[]>(
            `${ApiRoutes.Collections.GetTypes}`,
            {
                headers: Headers.HeadersWithoutAuth
            },
        );

        if (response.status === 200) {
            this.types = response.data;
        }
    }
}

export const collectionTypesStore = new CollectionTypesStore();