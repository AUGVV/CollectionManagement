import styled from "styled-components";

const MenuPageContainers = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 0px;
    font-size: medium;
    font-weight: bold;
    & a:-webkit-any-link {
         color: black;
         text-decoration: auto;
    }`

export default MenuPageContainers;
