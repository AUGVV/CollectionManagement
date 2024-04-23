import styled from "styled-components";

const UserInfoContainer = styled.div
    `display: flex;
     flex-direction: row;
     margin-left: 30px;
     margin-top: 30px;
     @media (max-width: 417px) {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        margin-left: 0px;
        align-items: center;
    }`

export default UserInfoContainer;
