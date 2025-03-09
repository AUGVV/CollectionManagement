import { action, makeObservable, observable } from "mobx";
import axios from "axios";
import TagsLookupModel from "../../Models/TagsLookupModel";
import { ApiRoutes } from "../../Constants/ApiRoutes";
import { Headers } from "../../Constants/Headers";
export class TagsModalStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    items: TagsLookupModel[] = [];

    @observable
    popularTags: TagsLookupModel[] = [];

    @observable
    isToggleTags: boolean = false;

    @observable
    isLoading: boolean = false;

    @observable
    selectedTagsCount: number = 0;

    @observable
    inputValue: string = '';

    @action
    async GetSuggestedTags(tag: string): Promise<void> {
        try {
            const response = await axios.get<TagsLookupModel[]>(
                `${ApiRoutes.Tags.GetSuggestedTags(tag)}`,
                {
                    headers: Headers.HeadersWithoutAuth
                },
            );

            if (response.status === 200) {
                this.items = response.data;
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
    async GetPopularTags(): Promise<void> {
        try {
            const response = await axios.get<TagsLookupModel[]>(
                `${ApiRoutes.Tags.GetPopularTags}`,
                {
                    headers: Headers.HeadersWithoutAuth
                },
            );

            if (response.status === 200) {
                this.popularTags = response.data;
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
}

export const tagsModalStore = new TagsModalStore();