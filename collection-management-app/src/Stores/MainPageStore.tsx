import { action, computed, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import UserModel from "../Models/UserModel";
import CollectionModel from "../Models/CollectionModel";
import PaginatedCollectionsModel from "../Models/PaginatedCollectionsModel";

export class MainPageStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    items: CollectionModel[] = [];

    @observable
    topItems: CollectionModel[] = [];

    @observable
    selectedUser: UserModel | undefined;

    @observable
    totalCount: number = 0;

    @observable
    currentPage: number = 0;

    @action
    async GetTopItems(): Promise<void> {
        const response = await fetch(`${ApiRoutes.Collections.GetTopCollections}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
        })

        if (response.status === 200) {
            let result = await response.json() as PaginatedCollectionsModel;
            this.topItems = result.items;
        }
    }

    @action
    async GetCollectionItems(pageNumber: number, search: string, type: number): Promise<void> {
        let request = `${ApiRoutes.Collections.GetCollections}?pageNumber=${pageNumber}&search=${search}`;
        if (!Number.isNaN(type)) {
            request += `&collectionType=${type}`
        }

        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
        })

        if (response.status === 200) {
            let result = await response.json() as PaginatedCollectionsModel;
            this.items = result.items;
            if (this.totalCount !== result.total) {
                this.currentPage = 0;
            }
            this.totalCount = result.total;
        }
    }

    @computed
    get GetTotalCount(): number {
        return this.totalCount / 10;
    }
}

export const mainPageStore = new MainPageStore();