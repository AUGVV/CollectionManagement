import styled from "styled-components";

const CustomHeader = styled.header
    `background-color: #282c34;
     min-height: 60px;
     display: flex;
     flex-direction: column;
     align-items: stretch;
     color: white;
     justify-content: space-around;
     @media (max-width: 417px) {
         display: flex;
         flex-direction: column;
         height: 99px;
         justify-content: space-around;
         align-items: center;
     }`

export default CustomHeader;