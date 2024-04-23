import { action, computed, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import { StorageNames } from "../Constants/StorageNames";
import TokenModel from "../Models/TokenModel";
import UserModel from "../Models/UserModel";
import ThemeType from "../Enums/ThemeType";
import Language from "../Enums/Language";
import { authStore } from "./AuthStore";

export class UsersStore {
    constructor() {
        makeObservable(this);
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
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
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
}

export const usersStore = new UsersStore();