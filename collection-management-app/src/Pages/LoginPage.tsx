import { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { authStore } from "../Stores/AuthStore";
import { useNavigate } from "react-router-dom";

import LoginBox from "./LoginPage/StyledComponents/LoginBox";
import ContainerAuth from "./LoginPage/StyledComponents/ContainerAuth";
import AuthInput from "./StyledComponents/AuthInput";
import AuthButton from "./StyledComponents/AuthButton";


export const LoginPage = observer(() => {
    const EmailInputRef = useRef<HTMLInputElement>(null);
    const PasswordInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.applicationAuthenticated === true) {
            navigate('/');
        }
    });

    function changeCredFields() {
        if (!authStore.authCompletedEffect) {
            authStore.SetAuthCompletedEffect(true);
        }
    }

    async function TryLogin() {
        var result = await authStore.TryLogin(EmailInputRef!.current!.value, PasswordInputRef!.current!.value);
        if (result) {
            navigate('/');
        }
    }

    return (<>
        <ContainerAuth>
            <LoginBox IsLoginContainer={true}>
                <AuthInput
                    IsCorrect={authStore.authCompletedEffect}
                    onChange={changeCredFields}
                    ref={EmailInputRef}
                    maxLength={50}
                    placeholder="Email" />
                <AuthInput
                    IsCorrect={authStore.authCompletedEffect}
                    onChange={changeCredFields}
                    ref={PasswordInputRef}
                    minLength={8}
                    maxLength={32}
                    placeholder="Password"
                    type="password"/>

                <AuthButton onClick={async () => await TryLogin()}>Log In</AuthButton>
            </LoginBox>
        </ContainerAuth>
    </>);
});

export default LoginPage;
