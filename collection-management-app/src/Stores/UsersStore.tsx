import { action, computed, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import { StorageNames } from "../Constants/StorageNames";
import TokenModel from "../Models/TokenModel";
import UserModel from "../Models/UserModel";
import ThemeType from "../Enums/ThemeType";
import Language from "../Enums/Language";
import { authStore } from "./AuthStore";
import CollectionModel from "../Models/CollectionModel";
import PaginatedCollectionsModel from "../Models/PaginatedCollectionsModel";

export class UsersStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    items: CollectionModel[] = [];

    @observable
    totalCount: number = 0;

    @observable
    currentPage: number = 0;

    @action
    async GetCollectionItems(pageNumber: number, search: string, type: number): Promise<void> {
        let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null) {
            let tokenModel = JSON.parse(tokens) as TokenModel;
            let request = `${ApiRoutes.Collections.GetUserCollections}?pageNumber=${pageNumber}&search=${search}`;
            if (!Number.isNaN(type)) {
                request += `&collectionType=${type}`
            }

            const response = await fetch(request, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `BEARER ${tokenModel.accessToken}`,
                },
            })

            if (response.status === 200) {
                let result = await response.json() as PaginatedCollectionsModel;
                this.items = result.items;
                if (this.totalCount !== result.total) {
                    this.currentPage = 0;
                }
                this.totalCount = result.total;
            } else if (response.status === 401) {
                let result = await authStore.TryToRefreshToken();
                if (result) {
                    await this.GetCollectionItems(pageNumber, search, type);
                }
            }
        }
    }

    @action
    async UpdateUserSettings(
        user: UserModel,
        nickname: string,
        theme: string,
        language: string): Promise<boolean> {

        let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null) {
            let tokenModel = JSON.parse(tokens) as TokenModel;
            if (user.theme !== theme) {
                console.log('Update theme to ' + theme);
                await this.UpdateTheme(tokenModel.accessToken, theme as ThemeType);
            }
            if (user.language !== language) {
                console.log('Update language to ' + language);
                await this.UpdateLanguage(tokenModel.accessToken, language as Language);
            }

            if (user.theme !== theme || user.language !== language || user.nickname !== nickname) {
                await authStore.AuthInit();
                alert(`Saved!`);
                return true;
            }
            return false;
        }
        return false;
    }

    async UpdateMetadata(user: UserModel, nickname: string): Promise<boolean> {
        let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null && user.nickname !== nickname) {
            let tokenModel = JSON.parse(tokens) as TokenModel;
            let response = await fetch(ApiRoutes.User.UpdateUser, {
                method: 'POST',
                body: JSON.stringify({ nickname: nickname }),
                headers: {
                    'accept': 'application/json',
                    'Authorization': `BEARER ${tokenModel.accessToken}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });

            if (response.status === 200) {
                return true;
            }
            else if (response.status === 400) {
                alert(`Nickname is not unique!`);
                return false;
            }
            else if (response.status === 401) {
                let result = await authStore.TryToRefreshToken();
                if (result) {
                    await this.UpdateMetadata(user, nickname);
                }
            }
        }
        return true;
    }

    async UpdateTheme(token: string, theme: ThemeType): Promise<boolean> {
        let response = await fetch(theme === ThemeType.Dark ? ApiRoutes.User.PutDarkMode : ApiRoutes.User.PutLightMode, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Authorization': `BEARER ${token}`,
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
            },
        });

        if (response.status === 200) {
            return true;
        }
        else if (response.status === 401) {
            let result = await authStore.TryToRefreshToken();
            if (result) {
                await this.UpdateTheme(token, theme);
            }
        }
        return false;
    }

    async UpdateLanguage(token: string, language: Language): Promise<boolean> {
        let response = await fetch(language === Language.En ? ApiRoutes.User.PutEnMode : ApiRoutes.User.PutRuMode, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Authorization': `BEARER ${token}`,
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
            },
        });

        if (response.status === 200) {
            return true;
        }
        else if (response.status === 401) {
            let result = await authStore.TryToRefreshToken();
            if (result) {
                await this.UpdateLanguage(token, language);
            }
        }
        return false;
    }

    @computed
    get GetTotalCount(): number {
        return this.totalCount / 10;
    }
}

export const usersStore = new UsersStore();