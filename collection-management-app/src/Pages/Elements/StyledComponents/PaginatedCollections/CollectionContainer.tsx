import styled from "styled-components";

const CollectionContainer = styled.section
    `display: flex;
    height: 100%;
    width: -webkit-fill-available;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    @media (max-width: 417px) {
        padding-left: 0px;
        padding-right: 0px;
    }`

export default CollectionContainer;