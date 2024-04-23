
class UserModel {
    userId: number,
    nickname: string;
    email: string;
    role: number;
    creationDate: string;
    isVerified: boolean;
    language: string;
    theme: string;

    constructor(
        userId: number,
        nickname: string,
        email: string,
        role: number,
        creationDate: string,
        isVerified: boolean,
        language: string,
        theme: string) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
        this.role = role;
        this.creationDate = creationDate;
        this.isVerified = isVerified;
        this.language = language;
        this.theme = theme;
    }
}

export default UserModel;