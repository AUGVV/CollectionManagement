import styled from "styled-components";

const TopContainer = styled.section
    `width: -webkit-fill-available;
     border-bottom: inset;
     display: flex;
     gap: 35px;
     flex-wrap: wrap;
     justify-content: center;
     align-items: center;
     flex-direction: row;
     align-content: center;
     padding-top: 30px;
     padding-bottom: 40px;
     padding-left: 20px;
     padding-right: 20px;
     border-top: inset;
     @media (max-width: 417px) {
        padding-left: 0px;
        padding-right: 0px;
     }`

export default TopContainer;