import ReactPaginate from "react-paginate";
import styled from "styled-components";

// https://github.com/AdeleD/react-paginate/blob/master/demo/js/demo.js#L15
const Paginator = styled(ReactPaginate).attrs({
    activeClassName: 'active', // default to "selected"
})`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style-type: none;

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

export default Paginator;