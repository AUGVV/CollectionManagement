import styled from "styled-components";

const AuthButtonsContainer = styled.div
    `right: 0;
     position: absolute;
     padding-right: 20px;
     display: flex;
     & a:last-child:before {
       display: inline-block;
       content: "";
       margin-right: 10px;
       width: 1px;
       height: 12px;
       background-color: white;
     }
     & a:first-child {
        padding-right: 10px
     }
     & a:-webkit-any-link {
         color: white;
         text-decoration: auto;
     }
     @media (max-width: 417px) {
        display: flex;
        position: relative;
        padding-right: 0px;
     }`

export default AuthButtonsContainer;
