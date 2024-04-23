import { observer } from "mobx-react";
import styled from "styled-components";
import userImage from '../../Images/DefaultUser.png';
import { authStore } from "../../Stores/AuthStore";

type Props = {
    click: React.MouseEventHandler<HTMLDivElement>
};

const LoginedUser = observer(({ click }: Props) => {
    return (<>
        <AuthButtonsContainer onClick={click}>
            <p>{authStore.GetUserNickname}</p>
            <UserImageBig src={userImage} />
        </AuthButtonsContainer>
    </>);
})

const UserImageBig = styled.img`
    border-radius: 50px;
    border-color: #bbbbbb;
    border-width: 1px;
    max-width: 40px;
    max-height: 40px;
    border-style: solid;
    margin-left: 8px;`

const AuthButtonsContainer = styled.div
    `right: 0;
     position: absolute;
     padding-right: 20px;
     display: flex;
     align-items: center;
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

export default LoginedUser;