import styled from "styled-components";

const LastCollectionsContainer = styled.div
    `display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
     @media (max-width: 417px) {
            display: flex;
            flex-direction: column;
            align-items: center;
     }`

export default LastCollectionsContainer;