import styled from "styled-components";

const TopContainer = styled.section
    `width: -webkit-fill-available;
    border-bottom: inset;
    display: flex;
    gap: 1px;
    flex-wrap: nowrap;
    align-items: stretch;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-top: inset;
     @media (max-width: 417px) {
        padding-left: 0px;
        padding-right: 0px;
     }`

export default TopContainer;