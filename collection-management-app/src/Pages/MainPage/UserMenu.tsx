import { observer } from "mobx-react";
import { authStore } from "../../Stores/AuthStore";
import { Link, useLocation, useNavigate } from "react-router-dom";

import EmailBar from "./StyledComponents/EmailBar";
import LogoutButton from "./StyledComponents/LogoutButton";
import MenuPageContainers from "./StyledComponents/MenuPageContainer";
import UserMenuDiv from "./StyledComponents/UserMenuDiv";

const UserMenu = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();

    async function FullLogout() {
        navigate("/")
        await authStore.Logout();
    }

    const adminButton = authStore.GetUserRole === 2
        ? location.pathname === "/Admin"
            ? <Link onClick={() => authStore.SetIsMenuOpen(false)} to={``}>Main Page</Link>
            : (<Link onClick={() => authStore.SetIsMenuOpen(false)} to={`Admin`}>Admin</Link>)
        : null;

    const pageButton = location.pathname === "/User"
        ? <Link onClick={() => authStore.SetIsMenuOpen(false)} to={``}>Main Page</Link>
        : <Link onClick={() => authStore.SetIsMenuOpen(false)} to={`User`}>Settings</Link>;

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

export default UserMenu;