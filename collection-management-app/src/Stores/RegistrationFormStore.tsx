import { action, makeObservable, observable } from "mobx";
import { StorageNames } from "../Constants/StorageNames";
import { ApiRoutes } from "../Constants/ApiRoutes";
import { authStore } from "./AuthStore";

export class RegistrationFormStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    isButtonActive: boolean = false;

    @observable
    isNicknameValid: boolean = true;

    @observable
    isEmailValid: boolean = true;

    @observable
    isPasswordValid: boolean = true;

    @observable
    nickname: string = '';

    @observable
    email: string = '';

    @observable
    password: string = '';

    @action
    setNickname(value: string): void {
        this.nickname = value;
        this.checkButtonAccess();
    }

    @action
    setEmail(value: string): void {
        this.email = value;
        this.checkButtonAccess();
    }

    @action
    setPassword(value: string): void {
        this.password = value;
        this.checkButtonAccess();
    }

    @action
    checkButtonAccess(): void {
        if (this.nickname.length !== 0 && this.email.length !== 0 && this.password.length !== 0) {
            let isEmailValid = false;
            let isPasswordValid = false;

            this.isNicknameValid = true;

            if (this.email.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                this.isEmailValid = true;
                isEmailValid = true;
            } else {
                this.isEmailValid = false;
                isEmailValid = false;
            }

            if (this.password.length >= 8) {
                this.isPasswordValid = true;
                isPasswordValid = true;
            } else {
                this.isPasswordValid = false;
                isPasswordValid = false;
            }

            if (isEmailValid === true && isPasswordValid === true) {
                this.isButtonActive = true;
            } else {
                this.isButtonActive = false;
            }
        }
        else {
            this.isButtonActive = false;
            this.isEmailValid = true;
        }
    }

    async Registration(): Promise<void> {
        console.log(this.nickname);
        let response = await fetch(ApiRoutes.Auth.Registration, {
            method: 'POST',
            body: JSON.stringify({ nickname: this.nickname, email: this.email, password: this.password }),
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
            },
        });

        if (response.status === 200) {
            authStore.SetAuthCompletedEffect(true);
            sessionStorage.setItem(StorageNames.TokenStorage, JSON.stringify(await response.json()));
            window.location.replace("/");
        }
        else if (response.status === 400) {
            // TODO: split errors and add to registration window.
            alert(`Nickname or email already exist (in development)`);
            this.isNicknameValid = false;
            this.isEmailValid = false;
            authStore.SetAuthCompletedEffect(false);
        }
    }
}

export const registrationFormStore = new RegistrationFormStore();