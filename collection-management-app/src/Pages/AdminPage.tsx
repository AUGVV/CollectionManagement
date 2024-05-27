import { adminUsersStore } from '../Stores/AdminUsersStore';
import { observer } from "mobx-react";
import { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

import UnorderedList from "./AdminPage/StyledComponents/UnorderedList";
import ListContainer from "./AdminPage/StyledComponents/ListContainer";
import ListItem from './AdminPage/StyledComponents/ListItem';
import Paginator from './AdminPage/StyledComponents/Paginator';
import SearchInput from './AdminPage/StyledComponents/SearchInput';

const AdminPage = observer(() => {
      const searchRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        const fetch = async () => {      
            setTimeout(async () => {
                await adminUsersStore.GetUsersForAdmin(1, '');
            }, 200);
        };

        fetch();
      }, []);

    const handlePageClick = async (event: { selected: number; }) => {
          adminUsersStore.currentPage = event.selected;
          const newOffset = event.selected + 1;
          await adminUsersStore.GetUsersForAdmin(newOffset, searchRef.current!.value);
    };

    return (<>
        <SearchInput placeholder="Search"
            ref={searchRef}
            onChange={async () => await adminUsersStore.GetUsersForAdmin(adminUsersStore.currentPage + 1, searchRef.current!.value)}></SearchInput>
        <ListContainer>
            <UnorderedList>
                {adminUsersStore.GetItems.map((item) => (
                    <>
                        <ListItem>
                            <Link to={`User/${item.userId}`} onClick={() => adminUsersStore.currentPage = 0}>{item.nickname}</Link>
                            <p>{adminUsersStore.MapRoleToString(item.role)}</p>
                            <p>{item.email}</p>
                            <p>{item.creationDate}</p>
                      </ListItem>
                    </>
                ))}
            </UnorderedList>
        </ListContainer>
        <Paginator
            pageCount={adminUsersStore.GetTotalCount}
            forcePage={adminUsersStore.currentPage}
            onPageChange={handlePageClick}
        />
    </>);
})

export default AdminPage;