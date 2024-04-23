import styled from "styled-components";

const RegistrationPage = () => {
    return (<>
        <ContainerAuth>
            <LoginBox>
                <AuthInput minLength={1} maxLength={20} placeholder="Nickname" />
                <AuthInput maxLength={50} placeholder="Email" />
                <AuthInput minLength={8} maxLength={32} placeholder="Password" />

                <AuthButton>Registration</AuthButton>
            </LoginBox>
        </ContainerAuth>
    </>);
}
const AuthButton = styled.button
    `margin-top: 29px;
     height: 43px;
     border-radius: 4px;
     background-color: #1cd4eb0f;
     border-color: #1cd4eb69;`


const AuthInput = styled.input
    `margin-bottom: 9px;
     height: 30px;
     border-color: #1cd4eb69;
     border-radius: 4px;
     &:focus {
         outline: 0px solid;
     }`

const ContainerAuth = styled.div
    `display: flex;
     justify-content: center;`

const LoginBox = styled.div
    `display: flex;
    flex-direction: column;
    background-color: #f0f9fb;
    padding: 20px;
    border-radius: 5px;
    height: 208px;
    width: 330px;
    margin-top: 120px;
    box-shadow: 4px 4px 12px 3px rgba(0, 0, 0, 0.2);
    @media (max-width: 417px) {
         width: 100%;
         margin-top: 0px;
         box-shadow: -1px 14px 12px 3px rgba(0, 0, 0, 0.2);
    }`
export default RegistrationPage;