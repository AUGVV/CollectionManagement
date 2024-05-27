import styled from "styled-components";

const UserMenuDiv = styled.div
    `display: flex;
     right: 0;
     position: absolute;
     flex-direction: column;
     background-color: #f0f9fb;
     border-radius: 5px;
     height: 102px;
     width: 244px;
     box-shadow: 4px 4px 12px 3px rgba(0, 0, 0, 0.2);
     @media (max-width: 417px) {
         width: 100%;
         margin-top: 0px;
         box-shadow: -1px 14px 12px 3px rgba(0, 0, 0, 0.2);
     }`

export default UserMenuDiv;
