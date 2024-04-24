import { authStore } from './Stores/AuthStore';
import { observer } from 'mobx-react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import CustomHeader from './StyledComponents/CustomHeader';
import AuthButtons from './Pages/MainPage/AuthButtons';
import styled from 'styled-components';
import AdminPage from './Pages/AdminPage';
import UserPage from './Pages/UserPage';
import RegistrationPage from './Pages/RegistrationPage';
import ChangePasswordPage from './Pages/ChangePasswordPage';
import LoginedUser from './Pages/MainPage/LoginedUser';
import UserMenu from './Pages/MainPage/UserMenu';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import AdminUserPage from './Pages/AdminUserPage';

const App = observer(() => {

    let AuthPanel = authStore.applicationAuthenticated
        ? <LoginedUser click={() => {
            authStore.isSubMenuOpen
                ? authStore.SetIsMenuOpen(false)
                : authStore.SetIsMenuOpen(true)
        }} />
        : <AuthButtons />;

    let UserMenuElement = authStore.isSubMenuOpen && authStore.applicationAuthenticated ? (<UserMenu></UserMenu>) : (null);
    let adminRoute = authStore.applicationAuthenticated && authStore.user?.role === 2 ? (<Route path="/Admin" element={<AdminPage />} />) : null;
    let adminUserRoute = authStore.applicationAuthenticated && authStore.user?.role === 2 ? (<Route path='Admin/User/:id' element={<AdminUserPage />} />) : null;

    return (
        <>
            <CustomHeader>
                <HeaderText>Collections</HeaderText>
                {AuthPanel}
            </CustomHeader>
            {UserMenuElement}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Registration" element={<RegistrationPage />} />
                {adminRoute}
                <Route path="/User" element={<UserPage />} />
                <Route path="/ChangePassword" element={<ChangePasswordPage />} />
                {adminUserRoute}
            </Routes>
        </>
    );
})

const HeaderText = styled.h1
    `margin-left: 20px;
     font-size: 25px;
     @media (max-width: 417px) {
         margin-bottom: 2px;
         margin-top: 2px;
         margin-left: 0px;
     }`

export default App;
