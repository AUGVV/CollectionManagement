import styled from "styled-components";

interface Props {
    IsLoginContainer: boolean;
}

const LoginBox = styled.div<Props>
    `display: flex;
    flex-direction: column;
    background-color: #f0f9fb;
    padding: 20px;
    border-radius: 5px;
    height: ${(props) => props.IsLoginContainer ? `162px;` : `208px;`} 208px;
    width: 330px;
    margin-top: 120px;
    box-shadow: 4px 4px 12px 3px rgba(0, 0, 0, 0.2);
    @media (max-width: 417px) {
         width: 100%;
         margin-top: 0px;
         box-shadow: -1px 14px 12px 3px rgba(0, 0, 0, 0.2);
    }`

export default LoginBox;