import { action, computed, makeObservable, observable } from "mobx";

export class EditButtonStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    isEditable: boolean = false;

    @observable
    default: string = 'undefined';

    @observable
    savedNickname: string = '';

    @observable
    newNickname: string = '';

    @action
    setDefault(value: string | undefined): void {
        this.default = value !== undefined ? value : 'undefined';
    }

    @action
    setSavedNickname(value: string): void {
        this.savedNickname = value;
    }

    @action
    setNewNickname(value: string): void {
        this.newNickname = value;
    }

    @action
    setIsEditable(value: boolean): void {
        this.isEditable = value;
    }

    @computed
    get GetSavedNickname(): string {
        return this.savedNickname.length > 0 ? this.savedNickname : this.default;
    }

    @computed
    get GetNewNickname(): string {
        return this.newNickname;
    }
}

export const editButtonStore = new EditButtonStore();