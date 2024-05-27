import styled from "styled-components";

interface Props {
    withMargin: boolean;
}

const SelectBar = styled.select<Props>
    `border-radius: 6px;
     font-size: 15px;
     margin-bottom: 15px;
     ${(props) => props.withMargin ? `margin-left: 5px;` : ``}`

export default SelectBar;
