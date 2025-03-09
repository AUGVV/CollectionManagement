import styled from "styled-components";

const CloseButton = styled.button
    `margin-bottom: 10px;
     display: flex;
     height: 20px;
     width: 20px;
     cursor: pointer;
     border-radius: 50%;
     background-color: #ff00005c;
     border-color: #e1131369;
     color: white;
     justify-content: center;
     flex-direction: column;
     align-items: center;
     &:hover {
         background-color: #ff1a1a;
         }`

export default CloseButton;
