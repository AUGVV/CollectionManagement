import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerAuth from './StyledComponents/ContainerAuth';
import LoginBox from './StyledComponents/LoginBox';
import { authStore } from '../../../../Stores/AuthStore';
import { observer } from 'mobx-react';
import AuthButton from './StyledComponents/AuthButton';
import CloseButton from './StyledComponents/CloseButton';
import ModalHeader from './StyledComponents/ModalHeader';
import AuthInput from '../../../../Pages/StyledComponents/AuthInput';

interface Props {
    toggleLogin: () => void;
    onClose: () => void;
}

export const LoginWindow = observer(({ onClose, toggleLogin }: Props) => {
    const EmailInputRef = useRef<HTMLInputElement>(null);
    const PasswordInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    function changeCredFields() {
        if (!authStore.authCompletedEffect) {
            authStore.SetAuthCompletedEffect(true);
        }
    }

    async function TryLogin() {
        var result = await authStore.TryLogin(EmailInputRef!.current!.value, PasswordInputRef!.current!.value);
        if (result) {
            toggleLogin();
        }
    }

    return (<>
        <ContainerAuth>
            <LoginBox IsLoginContainer={true}>
                <ModalHeader>
                    <CloseButton onClick={onClose}>x</CloseButton>
                </ModalHeader>
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
                    type="password" />
                <AuthButton onClick={async () => await TryLogin()}>Log In</AuthButton>
            </LoginBox>
        </ContainerAuth>
    </>);
});

export default LoginWindow;