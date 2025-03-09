import { authStore } from './Stores/AuthStore';
import { observer } from 'mobx-react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import CustomHeader from './StyledComponents/CustomHeader';
import styled from 'styled-components';
import AdminPage from './Pages/AdminPage';
import UserPage from './Pages/UserPage';
import LoginedUser from './Pages/MainPage/LoginedUser';
import UserMenu from './Pages/MainPage/UserMenu';
import MainPage from './Pages/MainPage';
import AdminUserPage from './Pages/AdminUserPage';
import CollectionForAllPage from './Pages/CollectionForAllPage';
import ErrorPage from './Pages/ErrorPages/ErrorPage';
import ItemPage from './Pages/ItemPage/ItemPage';
import AuthorizationAndRegistrationBar from './Components/Header/Authorization/AuthorizationAndRegistrationBar';
import { useRef } from 'react';
import HeaderSearchBar from './Components/Header/Search/StyledComponents/HeaderSearchBar';

const App = observer(() => {
    const searchRef = useRef<HTMLInputElement>(null);
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
        }
    };


    let AuthPanel = authStore.applicationAuthenticated
        ? <LoginedUser click={() => {
            authStore.isSubMenuOpen
                ? authStore.SetIsMenuOpen(false)
                : authStore.SetIsMenuOpen(true)
        }} />
        : <AuthorizationAndRegistrationBar />;


    let Header = window.location.pathname.includes("Error")
        ? null
        : (<CustomHeader>
            <HeaderText>Collections</HeaderText>
            <HeaderSearchBar
                ref={searchRef}
                onKeyDown={handleKeyDown}
                placeholder="Search by title or description"></HeaderSearchBar>
            {AuthPanel}
        </CustomHeader>);

    let UserMenuElement = authStore.isSubMenuOpen && authStore.applicationAuthenticated ? (<UserMenu></UserMenu>) : (null);
    let adminRoute = authStore.applicationAuthenticated && authStore.user?.role === 2 ? (<Route path="/Admin" element={<AdminPage />} />) : null;
    let adminUserRoute = authStore.applicationAuthenticated && authStore.user?.role === 2 ? (<Route path='Admin/User/:id' element={<AdminUserPage />} />) : null;

    return (
        <>
            {Header}
            {UserMenuElement}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Item/:id" element={<ItemPage />} />
                {adminRoute}
                <Route path="/User" element={<UserPage />} />
                {adminUserRoute}
                <Route path="/Collection/:id" element={<CollectionForAllPage />} />
                <Route path="/Error" element={<ErrorPage ErrorCode="500" />} />
            </Routes>
        </>
    );
})

const HeaderText = styled.h1
    `margin-left: 20px;
    margin-bottom: 21px;
     font-size: 25px;
     @media (max-width: 730px) {
         margin-bottom: 2px;
         margin-top: 2px;
         margin-left: 0px;
     }`

export default App;

function setIsEditing(arg0: boolean) {
    throw new Error('Function not implemented.');
}
