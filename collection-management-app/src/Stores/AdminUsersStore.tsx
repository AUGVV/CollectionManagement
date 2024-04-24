import { action, computed, makeObservable, observable } from "mobx";
import { ApiRoutes } from "../Constants/ApiRoutes";
import { StorageNames } from "../Constants/StorageNames";
import TokenModel from "../Models/TokenModel";
import PaginatedUsersModel from "../Models/PaginatedUsersModel";
import UserModel from "../Models/UserModel";
import { authStore } from "./AuthStore";
import RoleType from "../Enums/RoleType";

export class AdminUsersStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    totalCount: number = 0;

    @observable
    items: UserModel[] = [];

    @observable
    selectedUser: UserModel | undefined;

    @observable
    currentPage: number = 0;

    @action
    async GetUsersForAdmin(pageNumber: number, search: string): Promise<void> {
        let tokens = await sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null) {
            let tokenModel = JSON.parse(tokens) as TokenModel;
            const response = await fetch(`${ApiRoutes.User.GetUsersAdmin}?pageNumber=${pageNumber}&search=${search}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `BEARER ${tokenModel.accessToken}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
            })

            if (response.status === 200) {
                let result = await response.json() as PaginatedUsersModel;
                this.items = result.items;
                this.totalCount = result.total;
            } else if (response.status === 401) {
                let result = await authStore.TryToRefreshToken();
                if (result) {
                    await this.GetUsersForAdmin(pageNumber, search);
                }
            }
        }
    }

    @action
    async UpdateUser(
        user: UserModel,
        nickname: string,
        role: number): Promise<boolean> {

        if (user.nickname !== nickname || user.role !== role) {
            await authStore.AuthInit();
        }

        setTimeout(async () => {
            let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
            if (tokens !== null) {
                let tokenModel = JSON.parse(tokens) as TokenModel;
                if (user.nickname !== nickname) {
                    await this.UpdateMetadata(tokenModel.accessToken, user, nickname);
                }
                if (user.role !== role) {
                    await this.UpdateRole(tokenModel.accessToken, user.userId, role as RoleType);
                }
                if (user.nickname !== nickname || user.role !== role) {
                    await this.GetUserById(user.userId);
                    return true;
                }
                return false;
            }
        }, 100);
        return false;
    }

    async UpdateMetadata(token: string, user: UserModel, nickname: string): Promise<void> {
        let response = await fetch(ApiRoutes.User.UpdateUserAdmin(user.userId), {
            method: 'POST',
            body: JSON.stringify({ nickname: nickname }),
            headers: {
                'accept': 'application/json',
                'Authorization': `BEARER ${token}`,
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
            },
        });

        if (response.status === 400) {
            alert(`Nickname is not unique!`);
        }
    }

    async UpdateRole(token: string, userId: number, role: RoleType): Promise<void> {
        let endpoint = ApiRoutes.User.PutSetUserRoleAdmin(userId);
        switch (role) {
            case RoleType.Admin:
                endpoint = ApiRoutes.User.PutSetAdminRoleAdmin(userId);
                break;
            case RoleType.User:
                endpoint = ApiRoutes.User.PutSetUserRoleAdmin(userId);
                break;
            case RoleType.Banned:
                endpoint = ApiRoutes.User.PutSetBlockRoleAdmin(userId);
                break;
            default:
                endpoint = ApiRoutes.User.PutSetUserRoleAdmin(userId);
        }


        await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Authorization': `BEARER ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
    }

    @action
    async GetUserById(userId: number): Promise<void> {

        let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null) {
            let tokenModel = JSON.parse(tokens) as TokenModel;
            let response = await fetch(ApiRoutes.User.GetUserAdmin(userId), {
                method: 'Get',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `BEARER ${tokenModel.accessToken}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });
            if (response.status === 200) {
                this.selectedUser = await response.json() as UserModel;
            }
            else if (response.status === 401) {
                let result = await authStore.TryToRefreshToken();
                if (result) {
                    await this.GetUserById(userId);
                }
            }
        }
    }

     MapRoleToString(roleId: number): string {
        if (roleId === 1) {
                return "User";
            }
        else if (roleId === 2) {
                return "Admin";
            }
        else if (roleId === 3) {
                return "Banned";
            }

        return "undefined";
    }

    @computed
    get GetTotalCount(): number {
        return this.totalCount / 10;
    }

    @computed
    get GetItems(): UserModel[] {
        return this.items;
    }

    @computed
    get GetUserNickname(): string {
        return this.selectedUser?.nickname ?? "undefined";
    }

    @computed
    get GetUserEmail(): string {
        return this.selectedUser?.email ?? "undefined";
    }

    @computed
    get GetUserRole(): number {
        return this.selectedUser?.role ?? 1;
    }

    @computed
    get GetCreatedAt(): string {
        return this.selectedUser?.creationDate ?? "undefined";
    }

    @computed
    get GetUserRoleAsText(): string {
        if (this.selectedUser?.role !== null && this.selectedUser?.role !== undefined) {
            return this.MapRoleToString(this.selectedUser?.role);
        }

        return "undefined";
    }
}

export const adminUsersStore = new AdminUsersStore();