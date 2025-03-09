import styled from "styled-components";

const LeftBlockContainer = styled.div
    `min-width: 220px;
     display: flex;
     flex-direction: row;
     flex-wrap: nowrap;
     height: 60px;
     width: 220px;
     position: relative;
     &::after {
         content: "";
         position: absolute;
         top: 5px;
         right: 0;
         width: 2px;
         height: calc(100% - 10px);
         background-color: #9380804f;
    }
    @media (max-width: 417px) {
         width: 100%;
         &::after {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            margin-top: 58px;
         }
    }`

export default LeftBlockContainer;