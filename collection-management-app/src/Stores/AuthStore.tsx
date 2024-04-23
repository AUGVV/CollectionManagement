import { action, computed, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import { StorageNames } from "../Constants/StorageNames";
import TokenModel from "../Models/TokenModel";
import UserModel from "../Models/UserModel";

export class AuthStore {
    constructor() {
        makeObservable(this);

        let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null) {
            this.applicationAuthenticated = true;
            this.AuthInit();
            console.log("Auth when build storage");
        }
    }

    @observable
    authCompletedEffect: boolean = true;

    @observable
    applicationAuthenticated: boolean = false;

    @observable
    isSubMenuOpen: boolean = false;

    @observable
    user: UserModel | null = null;

    @observable
    oldNickname: string = "undefined";

    @action
    async TryLogin(email: string, password: string): Promise<boolean> {
        let response = await fetch(ApiRoutes.Auth.Login, {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
            },
        });

        if (response.status === 200) {
            this.SetAuthCompletedEffect(true);
            sessionStorage.setItem(StorageNames.TokenStorage, JSON.stringify(await response.json()));
            await this.AuthInit();

            return true;
        }
        else if (response.status === 404) {
            alert(`User does not exist!`);
            this.SetAuthCompletedEffect(false);
        }
        else {
            alert(`Something go wrong!`);
            this.SetAuthCompletedEffect(false);
        }
        return false;
    }

    @action
    async AuthInit(): Promise<boolean> {
        let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null) {
            let tokenModel = JSON.parse(tokens) as TokenModel;
            let response = await fetch(ApiRoutes.User.GetUser, {
                method: 'Get',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `BEARER ${tokenModel.accessToken}`,
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                },
            });
            if (response.status === 401) {
                var result = await this.TryToRefreshToken();
                if (result) {
                    this.AuthInit();
                }
                return false;
            }
            else if (response.status === 200) {
                this.applicationAuthenticated = true;
                this.user = await response.json() as UserModel;
                return true;
            }
        }
        return false;
    }

    @action
    async TryToRefreshToken(): Promise<Boolean> {
        let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null) {
            let tokenModel = JSON.parse(tokens) as TokenModel;
            const response = await fetch(ApiRoutes.Auth.Refresh, {
                method: 'Post',
                body: `"${tokenModel.refreshToken}"`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                },
            })

            if (response.status === 401 || response.status === 400) {
                sessionStorage.removeItem(StorageNames.TokenStorage);
                this.applicationAuthenticated = false;
                window.location.replace("/");
                return false;
            } else if (response.status === 200) {
                this.applicationAuthenticated = true;
                await sessionStorage.setItem(StorageNames.TokenStorage, JSON.stringify(await response.json()));
                return true;
            }
        }
        return false;
    }

    @action
    async Logout(): Promise<void> {
        let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null) {
            let tokenModel = JSON.parse(tokens) as TokenModel;
            let response = await fetch(ApiRoutes.Auth.Logout, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `BEARER ${tokenModel.accessToken}`,
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                },
            });

            if (response.status === 204) {
                this.user = null;
                this.SetAuthCompletedEffect(true);
                this.applicationAuthenticated = false;
                sessionStorage.removeItem(StorageNames.TokenStorage);
            }
            if (response.status === 401) {
                var result = await this.TryToRefreshToken();
                if (result) {
                    this.Logout();
                }
            }
        }
    }

    @action
    SetAuthCompletedEffect(value: boolean): void {
        this.authCompletedEffect = value;
    }

    @action
    SetIsMenuOpen(value: boolean): void {
        this.isSubMenuOpen = value;
    }

    @computed
    get GetUserNickname(): string {
        return this.user?.nickname ?? "undefined";
    }

    @computed
    get GetUserEmail(): string {
        return this.user?.email ?? "undefined";
    }

    @computed
    get GetUserRole(): number {
        return this.user?.role ?? 1;
    }

    @computed
    get GetCreatedAt(): string {
        return this.user?.creationDate ?? "undefined";
    }

    @computed
    get GetTheme(): string {
        return this.user?.theme ?? "Light";
    }

    @computed
    get GetLanguage(): string {
        return this.user?.language ?? "en-US";
    }

    @computed
    get GetUserRoleAsText(): string {
        if (this.user?.role !== null) {
            if (this.user?.role === 1) {
                return "User";
            }
            else if (this.user?.role === 2) {
                return "Admin";
            }
            else if (this.user?.role === 3) {
                return "Banned";
            }
        }

        return "undefined";
    }
}

export const authStore = new AuthStore();