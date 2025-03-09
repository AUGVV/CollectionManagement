import { observer } from "mobx-react";
import { registrationFormStore } from "../../../../Stores/RegistrationFormStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ContainerAuth from "./StyledComponents/ContainerAuth";
import AuthButton from "./StyledComponents/AuthButton";
import AuthInput from "../../../../Pages/StyledComponents/AuthInput";
import LoginBox from "./StyledComponents/LoginBox";
import CloseButton from "./StyledComponents/CloseButton";
import ModalHeader from "./StyledComponents/ModalHeader";
import { authStore } from "../../../../Stores/AuthStore";

interface Props {
    onClose: () => void;
}

const RegistrationPage = observer(({ onClose }: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.applicationAuthenticated === true) {
            navigate('/');
        }
    });

    return (<>
        <ContainerAuth>
            <LoginBox IsLoginContainer={false}>
                <ModalHeader>
                    <CloseButton onClick={onClose}>x</CloseButton>
                </ModalHeader>
                <AuthInput
                    IsCorrect={registrationFormStore.isNicknameValid}
                    onChange={(e) => registrationFormStore.setNickname(e.target.value)}
                    minLength={1}
                    maxLength={20}
                    placeholder="Nickname" />
                <AuthInput
                    IsCorrect={registrationFormStore.isEmailValid}
                    onChange={(e) => registrationFormStore.setEmail(e.target.value)}
                    maxLength={50}
                    placeholder="Email" />
                <AuthInput
                    IsCorrect={registrationFormStore.isPasswordValid}
                    onChange={(e) => registrationFormStore.setPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    maxLength={32}
                    placeholder="Password" />

                <AuthButton
                    disabled={!registrationFormStore.isButtonActive}
                    onClick={async () => await registrationFormStore.Registration()}>Registration</AuthButton>
            </LoginBox>
        </ContainerAuth>
    </>);
})

export default RegistrationPage;