import { observer } from "mobx-react";
import { changePasswordFormStore } from "../Stores/ChangePasswordFormStore";
import { authStore } from "../Stores/AuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginBox from "./LoginPage/StyledComponents/LoginBox";
import AuthButton from "./StyledComponents/AuthButton";
import AuthInput from "./StyledComponents/AuthInput";
import ContainerAuth from "./LoginPage/StyledComponents/ContainerAuth";

const ChangePasswordPage = observer(() => {
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.applicationAuthenticated === true) {
            navigate('/');
        }
    });

    return (<>
        <ContainerAuth>
            <LoginBox IsLoginContainer={false}>
                <AuthInput
                    IsCorrect={changePasswordFormStore.oldPasswordValid}
                    onChange={(e) => changePasswordFormStore.setOldPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    maxLength={32}
                    placeholder="Old password" />
                <AuthInput
                    IsCorrect={changePasswordFormStore.newPasswordValid}
                    onChange={(e) => changePasswordFormStore.setNewPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    maxLength={32}
                    placeholder="New password" />
                <AuthInput
                    IsCorrect={changePasswordFormStore.repeatPasswordValid}
                    onChange={(e) => changePasswordFormStore.setRepeatPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    maxLength={32}
                    placeholder="Repeat new passsword" />
                <AuthButton
                    disabled={!changePasswordFormStore.isButtonActive}
                    onClick={async () => await changePasswordFormStore.ChangePassword()}>Change</AuthButton>
            </LoginBox>
        </ContainerAuth>
    </>);
})

export default ChangePasswordPage;