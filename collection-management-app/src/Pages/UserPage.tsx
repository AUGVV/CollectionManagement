import { useRef } from 'react';
import { authStore } from '../Stores/AuthStore';
import { observer } from 'mobx-react';
import { usersStore } from '../Stores/UsersStore';
import { useNavigate } from 'react-router-dom';
import { editButtonStore } from '../Stores/EditButtonStore';

import styled from 'styled-components';
import userImage from '../Images/DefaultUser.png';
import FieldDescription from './UserPage/FieldDescription';
import FieldDescriptionContainer from './UserPage/StyledComponents/FieldDescriptionContainer';
import SaveButton from './UserPage/StyledComponents/SaveButton';
import UserImageBig from './UserPage/StyledComponents/UserImageBig';
import MetadataContainer from './UserPage/StyledComponents/MetadataContainer';
import UserInfoContainer from './UserPage/StyledComponents/UserInfoContainer';
import EditButton from './UserPage/EditButton';

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
                <EditButton />
                <FieldDescription title={'Role:'} description={authStore.GetUserRoleAsText} />
                <FieldDescription title={'Created At:'} description={authStore.GetCreatedAt} />
                <SelectBar ref={languageRef} required>
                    <option selected={authStore.GetLanguage === "en-US"} value="en-US">en-US(English)</option>
                    <option selected={authStore.GetLanguage === "ru-RU"} value="ru-RU">ru-RU(Русский)</option>
                </SelectBar>
                <SelectBar ref={themeRef} required>
                    <option selected={authStore.GetTheme === "Light"} value="Light">Light</option>
                    <option selected={authStore.GetTheme === "Dark"} value="Dark">Dark</option>
                </SelectBar>
                <FieldDescriptionContainer>
                    <SaveButton disabled={editButtonStore.isEditable} onClick={UpdateMetadata}>Save</SaveButton>
                    <ChangePassword onClick={() => navigate("/ChangePassword")}>Change password</ChangePassword>
                </FieldDescriptionContainer>
            </MetadataContainer>
        </UserInfoContainer>
    </>);
})

const SelectBar = styled.select
    `border-radius: 6px;
     font-size: 15px;
     margin-bottom: 15px;`

const ChangePassword = styled.button
    `margin-bottom: 9px;
     height: 30px;
     border-color: #85858569;
     border-radius: 4px;`

const Input = styled.input
    `margin-bottom: 9px;
     height: 30px;
     border-color: #1cd4eb69;
     border-radius: 4px;
     &:focus {
         outline: 0px solid;
     }`

export default UserPage;