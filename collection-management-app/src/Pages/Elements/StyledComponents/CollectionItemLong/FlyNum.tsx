import styled, { keyframes } from "styled-components";

interface Props {
    top: number;
    left: number;
    delay: number;
    duration: number;
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

const FlyNum = styled.div<Props>`
  position: absolute;
  font-size: 12px;
  color: black;
  animation: ${flyAnimation} 2s infinite;
  opacity: 0;
  pointer-events: none;
  top: ${(props) => `${props.top}%`};
  left: ${(props) => `${props.left}%`};
  animation-delay: ${(props) => `${props.delay}s`};
  animation-duration: ${(props) => `${props.duration}s`};
`;

export default FlyNum;