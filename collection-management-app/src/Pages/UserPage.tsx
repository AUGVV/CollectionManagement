import { useRef } from 'react';
import { authStore } from '../Stores/AuthStore';
import { observer } from 'mobx-react';
import { usersStore } from '../Stores/UsersStore';
import { useNavigate } from 'react-router-dom';
import { editButtonStore } from '../Stores/EditButtonStore';

import userImage from '../Images/DefaultUser.png';
import FieldDescription from './UserPage/FieldDescription';
import FieldDescriptionContainer from './UserPage/StyledComponents/FieldDescriptionContainer';
import SaveButton from './UserPage/StyledComponents/SaveButton';
import UserImageBig from './UserPage/StyledComponents/UserImageBig';
import MetadataContainer from './UserPage/StyledComponents/MetadataContainer';
import UserInfoContainer from './UserPage/StyledComponents/UserInfoContainer';
import EditButton from './UserPage/EditButton';
import SelectBar from './UserPage/StyledComponents/SelectBar';
import ChangePasswordButton from './UserPage/StyledComponents/ChangePasswordButton';

const UserPage = observer(() => {
    const themeRef = useRef<HTMLSelectElement>(null);
    const languageRef = useRef<HTMLSelectElement>(null);

    const navigate = useNavigate();

    async function UpdateMetadata() {
        if (authStore.user !== null) {

            var success = await usersStore.UpdateMetadata(
                authStore.user,
                editButtonStore.GetSavedNickname);

            if (success) {
                await usersStore.UpdateUserSettings(
                    authStore.user,
                    editButtonStore.GetSavedNickname,
                    themeRef.current!.options[themeRef.current!.selectedIndex].value,
                    languageRef.current!.options[languageRef.current!.selectedIndex].value);
            }
        }
    }

    return (<>
        <UserInfoContainer>
            <UserImageBig src={userImage} />
            <MetadataContainer>
                <FieldDescription title={'Email:'} description={authStore.GetUserEmail} />
                <EditButton isAdminUser={false} />
                <FieldDescription title={'Role:'} description={authStore.GetUserRoleAsText} />
                <FieldDescription title={'Created At:'} description={authStore.GetCreatedAt} />
                <SelectBar withMargin={false} ref={languageRef} required>
                    <option selected={authStore.GetLanguage === "en-US"} value="en-US">en-US(English)</option>
                    <option selected={authStore.GetLanguage === "ru-RU"} value="ru-RU">ru-RU(Русский)</option>
                </SelectBar>
                <SelectBar withMargin={false} ref={themeRef} required>
                    <option selected={authStore.GetTheme === "Light"} value="Light">Light</option>
                    <option selected={authStore.GetTheme === "Dark"} value="Dark">Dark</option>
                </SelectBar>
                <FieldDescriptionContainer>
                    <SaveButton disabled={editButtonStore.isEditable} onClick={UpdateMetadata}>Save</SaveButton>
                    <ChangePasswordButton onClick={() => navigate("/ChangePassword")}>Change password</ChangePasswordButton>
                </FieldDescriptionContainer>
            </MetadataContainer>
        </UserInfoContainer>
    </>);
})

export default UserPage;