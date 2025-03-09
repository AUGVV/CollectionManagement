import { action, computed, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import { Headers } from "../Constants/Headers";
import UserModel from "../Models/UserModel";
import CollectionModel from "../Models/CollectionModel";
import PaginatedCollectionsModel from "../Models/PaginatedCollectionsModel";
import axios from "axios";

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
        try {
            const response = await axios.get<PaginatedCollectionsModel>(
                `${ApiRoutes.Collections.GetTopCollections}`,
                {
                    headers: Headers.HeadersWithoutAuth
                },
            );

            if (response.status === 200) {
                this.topItems = response.data.items;
            }
            else if (response.status === 500) {
                window.location.replace("/Error");
            }
        }
        catch
        {
            window.location.replace("/Error");
        }
    }

    @action
    async GetCollectionItems(pageNumber: number, search: string, type: number): Promise<void> {
        let request = `${ApiRoutes.Collections.GetCollections}?pageNumber=${pageNumber}&search=${search}`;
        if (!Number.isNaN(type)) {
            request += `&collectionType=${type}`
        }

        const response = await axios.get<PaginatedCollectionsModel>(
            request,
            {
                headers: Headers.HeadersWithoutAuth
            },
        );

        if (response.status === 200) {
            this.items = response.data.items;
            if (this.totalCount !== response.data.total) {
                this.currentPage = 0;
            }
            this.totalCount = response.data.total;
        }
    }

    @action
    async LoadItems(firstElement: number, count: number, search: string, type: number): Promise<void> {
        let request = `${ApiRoutes.Collections.LoadCollections}?firstElement=${firstElement}&count=${count}&search=${search}`;
        if (!Number.isNaN(type)) {
            request += `&collectionType=${type}`
        }

        const response = await axios.get<CollectionModel[]>(
            request,
            {
                headers: Headers.HeadersWithoutAuth
            },
        );

        if (response.status === 200) {
            this.items = response.data;
        }
    }

    @computed
    get GetTotalCount(): number {
        return this.totalCount / 10;
    }
}

export const mainPageStore = new MainPageStore();
