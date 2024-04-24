import { useEffect, useRef } from 'react';
import { authStore } from '../Stores/AuthStore';
import { observer } from 'mobx-react';
import { adminUsersStore } from '../Stores/AdminUsersStore';
import { useParams } from 'react-router-dom';
import { editButtonStore } from '../Stores/EditButtonStore';

import userImage from '../Images/DefaultUser.png';
import FieldDescription from './UserPage/FieldDescription';
import FieldDescriptionContainer from './UserPage/StyledComponents/FieldDescriptionContainer';
import TitleText from './UserPage/StyledComponents/TitleText';
import RoleType from '../Enums/RoleType';
import EditButton from './UserPage/EditButton';
import SaveButton from './UserPage/StyledComponents/SaveButton';
import UserImageBig from './UserPage/StyledComponents/UserImageBig';
import UserInfoContainer from './UserPage/StyledComponents/UserInfoContainer';
import MetadataContainer from './UserPage/StyledComponents/MetadataContainer';
import SelectBar from './UserPage/StyledComponents/SelectBar';

const AdminUserPage = observer(() => {
    const { id } = useParams();

    const roleRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const fetch = async () => {
            setTimeout(async () => {
                await adminUsersStore.GetUserById(Number(id));
            }, 100);
        };

        fetch();
    }, []);

    async function UpdateMetadata() {
        if (authStore.user !== null && adminUsersStore.selectedUser !== undefined) {
            await adminUsersStore.UpdateUser(
                adminUsersStore.selectedUser,
                editButtonStore.GetSavedNickname,
                Number(roleRef.current!.options[roleRef.current!.selectedIndex].value));
        }
    }

    const bannedOption = authStore.user?.userId === adminUsersStore.selectedUser?.userId
        ? null
        : <option selected={adminUsersStore.GetUserRoleAsText === "Banned"} value={RoleType.Banned}>Banned</option>;

    return (<>
        <UserInfoContainer>
            <UserImageBig src={userImage} />
            <MetadataContainer>
                <FieldDescription title={'Email:'} description={adminUsersStore.GetUserEmail} />
                <EditButton isAdminUser={true} />
                <FieldDescriptionContainer>
                    <TitleText>Role:</TitleText>
                    <SelectBar withMargin={true} ref={roleRef} required>
                        <option selected={adminUsersStore.GetUserRoleAsText === "User"} value={RoleType.User}>User</option>
                        <option selected={adminUsersStore.GetUserRoleAsText === "Admin"} value={RoleType.Admin}>Admin</option>
                        {bannedOption}
                    </SelectBar>
                </FieldDescriptionContainer>
                <FieldDescription title={'Created At:'} description={adminUsersStore.GetCreatedAt} />
                <FieldDescriptionContainer>
                    <SaveButton disabled={editButtonStore.isEditable} onClick={UpdateMetadata}>Save</SaveButton>
                </FieldDescriptionContainer>
            </MetadataContainer>
        </UserInfoContainer>
    </>);
})

export default AdminUserPage;