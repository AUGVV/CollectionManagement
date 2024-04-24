import { Link } from "react-router-dom";

import AuthButtonsContainer from "./StyledComponents/AuthButtonContainers";

const AuthButtons = () => {
    return (<>
        <AuthButtonsContainer>
            <Link to={`Login`}>Login</Link>
            <Link to={`Registration`}>Registration</Link>
        </AuthButtonsContainer>
    </>);
}

export default AuthButtons;