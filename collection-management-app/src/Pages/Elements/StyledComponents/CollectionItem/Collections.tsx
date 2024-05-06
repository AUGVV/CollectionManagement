import styled from "styled-components";

const CustomHeader = styled.article
    `display: flex;
     width: 300px;
     height: 155px;
     overflow: hidden;
     background-color: #f0f9fb;
     border-radius: 9px;
     box-shadow: 4px 4px 12px 3px rgba(0, 0, 0, 0.2);
     flex-direction: row;
     flex-wrap: wrap;
     align-content: flex-start;
     @media (max-width: 417px) {
         width: 100%;
     }`

export default CustomHeader;