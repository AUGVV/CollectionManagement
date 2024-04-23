import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AuthButtons = () => {
    const navigate = useNavigate();
    function GoToLogin() {
        navigate('/Login');
    }

    function GoToRegistration() {
        navigate('/Registration');
    }

    return (<>
        <AuthButtonsContainer>
            <a onClick={GoToLogin}>Login</a>
            <a onClick={GoToRegistration}>Registration</a>
        </AuthButtonsContainer>
    </>);
}

const AuthButtonsContainer = styled.div
    `right: 0;
     position: absolute;
     padding-right: 20px;
     display: flex;
     & a:last-child:before {
       display: inline-block;
       content: "";
       margin-right: 10px;
       width: 1px;
       height: 12px;
       background-color: white;
     }
     & a:first-child {
        padding-right: 10px
     }
     @media (max-width: 417px) {
        display: flex;
        position: relative;
        padding-right: 0px;
     }`

export default AuthButtons;