import { adminUsersStore } from '../Stores/AdminUsersStore';
import { observer } from "mobx-react";
import { useEffect } from 'react';
import { Link } from "react-router-dom";

import styled from "styled-components";
import ReactPaginate from 'react-paginate';
import UnorderedList from "./AdminPage/StyledComponents/UnorderedList";
import ListContainer from "./AdminPage/StyledComponents/ListContainer";

const AdminPage = observer(() => {
      useEffect(() => {
        const fetch = async () => {      
            setTimeout(async () => {
                await adminUsersStore.GetUsersForAdmin(1, '');
            }, 200);
        };

        fetch();
      }, []);

      const handlePageClick = async (event: { selected: number; }) => {
          const newOffset = event.selected + 1;
          await adminUsersStore.GetUsersForAdmin(newOffset, '');
      };
    //TODO: Add search field
    return (<>
        <ListContainer>
            <UnorderedList>
                {adminUsersStore.GetItems.map((item) => (
                    <>
                      <ListItem>
                            <Link to={`User/${item.userId}`}>{item.nickname}</Link>
                            <p>{adminUsersStore.MapRoleToString(item.role)}</p>
                            <p>{item.email}</p>
                            <p>{item.creationDate}</p>
                      </ListItem>
                    </>
                ))}
            </UnorderedList>
        </ListContainer>
        <MyPaginate
          pageCount={adminUsersStore.GetTotalCount}
          forcePage={0}
          onPageChange={handlePageClick}
        />
    </>);
})

// https://github.com/AdeleD/react-paginate/blob/master/demo/js/demo.js#L15
const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active', // default to "selected"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;

  li a {
    border-radius: 7px;
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
`;

const ListItem = styled.li
    `height: 60px;
     display: block;
     border-bottom: solid;
     text-align: left;
     display: grid;
     align-items: center;
     grid-template-columns: repeat(4, minmax(0, 1fr));
     & a:first-child {
        margin-left: 20px
     }`

export default AdminPage;