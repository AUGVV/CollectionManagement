import ReactPaginate from "react-paginate";
import styled from "styled-components";

const CollectionsPaginator = styled(ReactPaginate).attrs({
    activeClassName: 'active',
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

export default CollectionsPaginator;