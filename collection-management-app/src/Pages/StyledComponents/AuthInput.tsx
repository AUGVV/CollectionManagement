import styled from "styled-components";

interface Props {
    IsCorrect: boolean;
}

const AuthInput = styled.input<Props>
    `margin-bottom: 9px;
     height: 30px;
     border-color: ${(props) => props.IsCorrect ? `#1cd4eb69;` : `#eb0b0b69;`}
     border-radius: 4px;
     &:focus {
         outline: 0px solid;
     }`

export default AuthInput;
