import styled from "styled-components";
interface Props {
    pos: number;
}

const HeaderButtons = styled.button<Props>
    `height: 34px;
     background-color: #27877ea8;
     color: azure;
     border-radius: ${(props) => {
        if (props.pos === 1) return "9px 0px 0px 9px;";
        if (props.pos === 2) return "0px 9px 9px 0px;";
        return "0px";
     }};
     border-color: #7b7b7b69;`


export default HeaderButtons;
