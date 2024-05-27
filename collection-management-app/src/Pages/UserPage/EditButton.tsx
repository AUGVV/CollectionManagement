import { editButtonStore } from "../../Stores/EditButtonStore";
import { adminUsersStore } from "../../Stores/AdminUsersStore";
import { observer } from "mobx-react";
import { authStore } from "../../Stores/AuthStore";

import FieldDescriptionContainer from "./StyledComponents/FieldDescriptionContainer";
import Description from "./StyledComponents/Description";
import TitleText from "./StyledComponents/TitleText";
import InputEditButton from "./StyledComponents/InputEditButton";
import EditNicknameButton from "./StyledComponents/EditNicknameButton";

interface Props {
    isAdminUser: boolean;
}

const EditButton = observer(({ isAdminUser }: Props) => {
    editButtonStore.setDefault(isAdminUser ? adminUsersStore?.selectedUser?.nickname : authStore.GetUserNickname);

    function handleClick() {
        editButtonStore.setIsEditable(true)
        editButtonStore.setNewNickname(editButtonStore.GetSavedNickname);
    }

    const handleKey = (e: any) => {
        if (e.key === 'Enter') {
            editButtonStore.setSavedNickname(editButtonStore.newNickname);
            editButtonStore.setIsEditable(false);
        }
        else if (e.key === 'Escape') {
            editButtonStore.setNewNickname(editButtonStore.savedNickname)
            editButtonStore.setIsEditable(false);
        }
    }

    const handleChanges = (e: any) => {
        editButtonStore.setNewNickname(e.target.value)
    }

    const EditableField = editButtonStore.isEditable
        ? <InputEditButton maxLength={20} onKeyDown={handleKey} onChange={handleChanges} value={editButtonStore.newNickname} />
        : (<><TitleText>Nickname:</TitleText><Description>{editButtonStore.GetSavedNickname}</Description></>);

    const EditButton = editButtonStore.isEditable
        ? null
        : <EditNicknameButton onClick={handleClick}>Edit</EditNicknameButton>;

    return (<>
        <FieldDescriptionContainer>
            {EditableField}
            {EditButton}
        </FieldDescriptionContainer>
    </>);
})

export default EditButton;