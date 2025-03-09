import styled from "styled-components";

const AuthButtonsContainer = styled.div
    `right: 0;
     padding-right: 20px;
     display: flex;
     margin-top: 2px;
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
     @media (max-width: 730px) {
        display: flex;
        padding-right: 0px;
        margin-bottom: 5px;
     }`

export default AuthButtonsContainer;
