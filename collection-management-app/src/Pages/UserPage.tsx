import { useEffect, useRef } from 'react';
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
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { collectionTypesStore } from '../Stores/CollectionTypesStore';
import CollectionItem from './Elements/CollectionItem';

const UserPage = observer(() => {
    const searchRef = useRef<HTMLInputElement>(null);
    const typesRef = useRef<HTMLSelectElement>(null);

    const themeRef = useRef<HTMLSelectElement>(null);
    const languageRef = useRef<HTMLSelectElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            setTimeout(async () => {
                usersStore.currentPage = 0;
                await usersStore.GetCollectionItems(1, '', NaN);
                await collectionTypesStore.GetTypes();
            }, 100);
        };

        fetch();
    }, []);

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

    const handlePageClick = async (event: { selected: number; }) => {
        usersStore.currentPage = event.selected;
        const newOffset = event.selected + 1;
        await usersStore.GetCollectionItems(
            newOffset,
            searchRef.current!.value,
            Number(typesRef.current!.value));
    };

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
        <OtherSearchContainer>
            <SearchBar
                ref={searchRef}
                onChange={async () => await usersStore.GetCollectionItems(
                    1,
                    searchRef.current!.value,
                    Number(typesRef.current!.value))} placeholder="Search by title or description"></SearchBar>
            <SelectBar2
                ref={typesRef}
                onChange={async () => await usersStore.GetCollectionItems(
                    1,
                    searchRef.current!.value,
                    Number(typesRef.current!.value))}
                required>
                <option selected value={undefined}>none</option>
                {collectionTypesStore.types.map((item) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </SelectBar2>
            <AddCollectionButton>Add new collection</AddCollectionButton>
        </OtherSearchContainer>
        <Container2>
            {usersStore.items.map((item) => (
                <CollectionItem
                    isAdmin={false}
                    item={item} />
            ))}
        </Container2>
        <Paginator2
            pageCount={usersStore.GetTotalCount}
            forcePage={usersStore.currentPage}
            onPageChange={handlePageClick}
        />
    </>);
})

const AddCollectionButton = styled.button
    `height: 36px;
    border-color: #1cebe569;
    background-color: #00fffc2b;
    border-radius: 4px;
    -webkit-text-stroke: thin;`

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
     align-items: center;
     @media (max-width: 880px) {
            display: flex;
            flex-direction: column;
            align-items: center;
     }`

const SearchBar = styled.input
    `margin-left: 20px;
     height: 30px;
     width: 50%;
     border-radius: 10px;
     @media (max-width: 880px) {
         width: 90%;
         margin-bottom: 10px;
     }`

const SelectBar2 = styled.select
    `height: 35px;
     width: 20%;
     border-radius: 6px;
     @media (max-width: 880px) {
         margin-right: 0px;
         width: 50%;
     }`

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

export default UserPage;