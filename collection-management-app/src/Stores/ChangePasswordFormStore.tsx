import { action, makeObservable, observable } from "mobx";
import { StorageNames } from "../Constants/StorageNames";
import { ApiRoutes } from "../Constants/ApiRoutes";
import { authStore } from "./AuthStore";

import TokenModel from "../Models/TokenModel";

export class ChangePasswordFormStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    isButtonActive: boolean = false;

    @observable
    oldPasswordValid: boolean = true;

    @observable
    newPasswordValid: boolean = true;

    @observable
    repeatPasswordValid: boolean = true;

    @observable
    newPassword: string = '';

    @observable
    oldPassword: string = '';

    @observable
    repeatPassword: string = '';

    @action
    setNewPassword(value: string): void {
        this.newPassword = value;
        this.checkButtonAccess();
    }

    @action
    setOldPassword(value: string): void {
        this.oldPassword = value;
        this.checkButtonAccess();
    }

    @action
    setRepeatPassword(value: string): void {
        this.repeatPassword = value;
        this.checkButtonAccess();
    }

    @action
    checkButtonAccess(): void {
        if (this.newPassword.length !== 0 && this.oldPassword.length !== 0 && this.repeatPassword.length !== 0) {

            if (this.newPassword.length >= 8) {
                this.newPasswordValid = true;
            } else {
                this.newPasswordValid = false;
            }

            if (this.oldPassword.length >= 8) {
                this.oldPasswordValid = true;
            } else {
                this.oldPasswordValid = false;
            }

            if (this.repeatPassword.length >= 8) {
                this.repeatPasswordValid = true;
            } else {
                this.repeatPasswordValid = false;
            }

            if (this.repeatPasswordValid === true && this.oldPasswordValid === true && this.newPasswordValid === true) {
                this.isButtonActive = true;
            } else {
                this.isButtonActive = false;
            }
        }
        else {
            this.isButtonActive = false;
        }
    }

    @action
    async ChangePassword(): Promise<void> {

        if (this.newPassword !== this.repeatPassword) {
            alert(`The new password is not correct!`);
            return;
        }

        let tokens = sessionStorage.getItem(StorageNames.TokenStorage);
        if (tokens !== null) {
            let tokenModel = JSON.parse(tokens) as TokenModel;
            let response = await fetch(ApiRoutes.User.ChangePassword, {
                method: 'PUT',
                body: JSON.stringify({ oldPassword: this.oldPassword, newPassword: this.newPassword }),
                headers: {
                    'accept': 'application/json',
                    'Authorization': `BEARER ${tokenModel.accessToken}`,
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                },
            });

            if (response.status === 204) {
                window.location.replace("/User");
            }
            else if (response.status === 400) {
                // TODO: Split errors.
                alert(`Old password incorrect!`);
            }
            else if (response.status === 401) {
                let result = await authStore.TryToRefreshToken();
                if (result) {
                    await this.ChangePassword();
                }
            }
        }
    }
}

export const changePasswordFormStore = new ChangePasswordFormStore();