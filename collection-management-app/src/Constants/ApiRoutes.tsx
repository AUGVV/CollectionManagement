const Scope = "https://localhost:44373";
export const ApiRoutes = {
 
    Auth: {
        Login: `${Scope}/Auth/login`,
        Registration: `${Scope}/Auth/registration`,
        Refresh: `${Scope}/Auth/refresh`,
        Logout: `${Scope}/Auth/logout`,
    },
    User:
    {
        GetUser: `${Scope}/Users`,
        GetUserAdmin: (userId: number) => `${Scope}/Users/${userId}`,
        GetUsersAdmin: `${Scope}/Users/get-users`,
        PutSetAdminRoleAdmin: (userId: number) => `${Scope}/Users/set-admin-role/${userId}`,
        PutSetUserRoleAdmin: (userId: number) => `${Scope}/Users/set-user-role/${userId}`,
        PutSetBlockRoleAdmin: (userId: number) => `${Scope}/Users/set-block-role/${userId}`,
        PutLightMode: `${Scope}/Users/set-light-mode`,
        PutDarkMode: `${Scope}/Users/set-dark-mode`,
        PutRuMode: `${Scope}/Users/set-ru-mode`,
        PutEnMode: `${Scope}/Users/set-en-mode`,
        UpdateUser: `${Scope}/Users/update`,
        UpdateUserAdmin: (userId: number) => `${Scope}/Users/update/${userId}`,
        ChangePassword: `${Scope}/Users/change-password`,
    }
} 
