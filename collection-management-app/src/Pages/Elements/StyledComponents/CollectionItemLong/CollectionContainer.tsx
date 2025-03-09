import styled, { keyframes } from "styled-components";

interface Props {
    pos: number;
}

const flyAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-30px) scale(1.5);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const CollectionContainer = styled.article<Props>
    `display: flex;
     position: relative;
     height: 60px;
     overflow: hidden;
     background-color: ${(props) => {
        if (props.pos === 1) return "#f7ffa957";
        if (props.pos === 2) return "#e9e2db63";
        if (props.pos === 3) return "#ffc79061";
        return "#f0f9fb";
    }};
    border-radius: ${(props) => {
        if (props.pos === 1) return "9px 9px 0px 0px";
        if (props.pos === 5) return "0px 0px 9px 9px";
        return "0px";
    }};
     box-shadow: ${(props) => {
        if (props.pos === 1) return "0px -3px 12px 3px rgba(0, 0, 0, 0.2)";
        if (props.pos === 5) return "0px 3px 12px 3px rgba(0, 0, 0, 0.2)";
        return "3px 0px 5px rgba(0, 0, 0, 0.2), -3px 0 5px rgba(0, 0, 0, 0.2);";
    }};
     flex-direction: row;
     flex-wrap: nowrap;
     align-content: flex-start;
     &:hover {
        background-color: ${(props) => {
        if (props.pos === 1) return "#f7ffa9";
        if (props.pos === 2) return "#e9e2db00";
        if (props.pos === 3) return "#f5c18e8f";
        return "#e4faff";
    }};
     }
     &:hover .FlyNum {
        animation: ${flyAnimation} 2s infinite;
        opacity: 1;
     }
     @media (max-width: 417px) {
         width: 100%;
         flex-direction: column;
         height: 120px;
         border: 4px ridge
     }`

export default CollectionContainer;