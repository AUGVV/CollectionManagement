import { observer } from "mobx-react";
import { authStore } from "../../Stores/AuthStore";
import { useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";

const UserMenu = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();

    function NavigateAndClose(path: string) {
        navigate(path)
        authStore.SetIsMenuOpen(false);
    }

    async function FullLogout() {
        navigate("/")
        await authStore.Logout();
    }

    const adminButton = authStore.GetUserRole === 2
        ? location.pathname === "/Admin"
            ? <a onClick={() => NavigateAndClose("/")}>Main Page</a>
            : (<a onClick={() => NavigateAndClose("/Admin")}>Admin</a>)
        : null;

    const pageButton = location.pathname === "/User"
        ? <a onClick={() => NavigateAndClose("/")}>Main Page</a>
        : <a onClick={() => NavigateAndClose("/User")}>Settings</a>;

    return (<>
        <UserMenuDiv>
            <EmailBar>Email: {authStore.GetUserEmail}</EmailBar>
            <MenuPageContainers>
                {pageButton}
                {adminButton}
            </MenuPageContainers>
            <LogoutButton onClick={async () => await FullLogout()}>Logout</LogoutButton>
        </UserMenuDiv>
    </>);
})

const MenuPageContainers = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 0px;
    font-size: medium;
    font-weight: bold;`

const EmailBar = styled.p`
    margin-top: 7px;
    align-self: center;
    font-size: 14px;
`

const LogoutButton = styled.p`
    right: 0;
    position: absolute;
    bottom: 0;
    margin-right: 10px;
    margin-bottom: 10px;
`

const UserMenuDiv = styled.div
    `display: flex;
     right: 0;
     position: absolute;
     flex-direction: column;
     background-color: #f0f9fb;
     border-radius: 5px;
     height: 102px;
     width: 244px;
     box-shadow: 4px 4px 12px 3px rgba(0, 0, 0, 0.2);
     @media (max-width: 417px) {
         width: 100%;
         margin-top: 0px;
         box-shadow: -1px 14px 12px 3px rgba(0, 0, 0, 0.2);
     }`

export default UserMenu;