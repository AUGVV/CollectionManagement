import styled from "styled-components";
import ReactPaginate from 'react-paginate';
import { adminUsersStore } from '../Stores/AdminUsersStore';
import { observer } from "mobx-react";
import { useEffect } from 'react';
import { Link } from "react-router-dom";

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

    return (<>
        <AuthButtonsContainer>
            <UnorderedList>
                {adminUsersStore.GetItems.map((item) => (
                    <>
                      <ListItem>
                          <Link to={`User/${item.userId}`}>{item.nickname}</Link>
                          <p>{item.role}</p>
                          <p>{item.email}</p>
                          <p>{item.creationDate}</p>
                      </ListItem>
                    </>
                ))}
            </UnorderedList>
        </AuthButtonsContainer>
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

const UnorderedList = styled.ul
    `padding-inline-start: 0px;`

const ListItem = styled.li
    `height: 60px;
     display: block;
     border-bottom: solid;
     text-align: left;
     display: grid;
     align-items: center;
     grid-template-columns: repeat(4, minmax(0, 1fr));`

const AuthButtonsContainer = styled.div
    `height: 530px;
     margin-top: 20px;
     margin-left: 20px;
     margin-right: 20px;
     background-color: #f0f9fb;
     box-shadow: inset -4px 6px 7px 3px rgba(0, 0, 0, 0.2);
     border-color: rebeccapurple;
     border: solid;
     border-radius: 8px;
     overflow: overlay;`



export default AdminPage;