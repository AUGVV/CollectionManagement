import { useState } from "react";
import LoginWindow from "./Modals/LoginWindow";
import RegistrationWindow from "./Modals/RegistrationWindow";
import HeaderButtons from "./StyledComponents/HeaderButtons";
import AuthButtonsContainer from "./StyledComponents/AuthButtonContainers";

const AuthorizationAndRegistrationBar = () => {
    const [isLoginWindowOpen, setIsLoginWindowOpen] = useState(false);
    const [isRegistrationWindowOpen, setIsRegistrationWindowOpen] = useState(false);

    const toggleLogin = () => {
        setIsLoginWindowOpen(prevState => !prevState);
    };

    const toggleRegistration = () => {
        setIsRegistrationWindowOpen(prevState => !prevState);
    };

    return (<>
        <AuthButtonsContainer>
            <HeaderButtons pos={1} onClick={toggleLogin}>Login</HeaderButtons>
            {isLoginWindowOpen && <LoginWindow onClose={toggleLogin} toggleLogin={toggleLogin} />}
            <HeaderButtons pos={2} onClick={toggleRegistration}>Registration</HeaderButtons>
            {isRegistrationWindowOpen && <RegistrationWindow onClose={toggleRegistration} />}
        </AuthButtonsContainer>
    </>);
}

export default AuthorizationAndRegistrationBar;