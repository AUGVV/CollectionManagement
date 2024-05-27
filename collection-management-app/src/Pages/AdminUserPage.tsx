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
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import CollectionItem from './Elements/CollectionItem';
import { collectionTypesStore } from '../Stores/CollectionTypesStore';

const AdminUserPage = observer(() => {
    const searchRef = useRef<HTMLInputElement>(null);
    const typesRef = useRef<HTMLSelectElement>(null);
    const { id } = useParams();

    const roleRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const fetch = async () => {
            setTimeout(async () => {
                await adminUsersStore.GetUserById(Number(id));
                await adminUsersStore.GetCollectionItems(1, '', NaN);
                await collectionTypesStore.GetTypes();
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

    const handlePageClick = async (event: { selected: number; }) => {
        adminUsersStore.currentPage = event.selected;
        const newOffset = event.selected + 1;
        await adminUsersStore.GetCollectionItems(
            newOffset,
            searchRef.current!.value,
            Number(typesRef.current!.value));
    };

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
        <OtherSearchContainer>
            <SearchBar
                ref={searchRef}
                onChange={async () => await adminUsersStore.GetCollectionItems(
                    1,
                    searchRef.current!.value,
                    Number(typesRef.current!.value))}
                placeholder="Search by title or description"></SearchBar>
            <SelectBar2
                ref={typesRef}
                onChange={async () => await adminUsersStore.GetCollectionItems(
                    1,
                    searchRef.current!.value,
                    Number(typesRef.current!.value))}
                required>
                <option selected value={undefined}>none</option>
                {collectionTypesStore.types.map((item) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </SelectBar2>
        </OtherSearchContainer>
        <Container2>
            {adminUsersStore.userCollections.map((item) => (
                <CollectionItem
                    isAdmin={true}
                    item={item} />
            ))}
        </Container2>
        <Paginator2
            pageCount={adminUsersStore.GetCollectionsTotalCount}
            forcePage={adminUsersStore.currentCollectionPage}
            onPageChange={handlePageClick}
        />
    </>);
})

const Container2 = styled.section
    `display: flex;
    height: 100%;
    width: -webkit-fill-available;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;`

const OtherSearchContainer = styled.div
    `display: flex;
     flex-direction: row;
     justify-content: center;
     gap: 20px;
     border-top: groove;
     padding-top: 20px;
     align-items: center;`

const SearchBar = styled.input
    `margin-left: 20px;
     height: 30px;
     width: 50%;
     border-radius: 10px;`

const SelectBar2 = styled.select
    `height: 35px;
     width: 20%;
     border-radius: 6px;`

const Paginator2 = styled(ReactPaginate).attrs({
    activeClassName: 'active', // default to "selected"
})`
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style-type: none;
    align-items: center;
    border-top: groove;
    border-bottom: groove;
    padding-top: 10px;
    padding-bottom: 10px;

  li a {
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }     
  @media (max-width: 417px) {
     display: flex;
     justify-content: center;
     list-style-type: none;
     padding-inline-start: 0px;
  }
`;

export default AdminUserPage;