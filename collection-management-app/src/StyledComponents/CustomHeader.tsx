import styled from "styled-components";

const CustomHeader = styled.header
    `background-color: #282c34;
     min-height: 60px;
     display: flex;
     align-items: center;
     color: white;
     justify-content: space-between;
     @media (max-width: 730px) {
         display: flex;
         flex-direction: column;
         height: 150px;
         justify-content: space-around;
         align-items: center;
     }`

export default CustomHeader;