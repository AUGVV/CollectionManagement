import styled from "styled-components";

const InfinityScrollCollectionContainer = styled.section
    `height: 100%;
     width: -webkit-fill-available;
     gap: 5px;
     margin-bottom: 20px;
     padding-left: 15px;
     padding-right: 15px;
     border-bottom: inset;
     display: flex;
     box-shadow: -1px 8px 12px 3px rgba(0, 0, 0, 0.2);
     flex-wrap: nowrap;
     align-items: stretch;
     flex-direction: column;
     padding-top: 10px;
     padding-bottom: 10px;
     border-top: inset;
     @media (max-width: 417px) {
        padding-left: 0px;
        padding-right: 0px;
    }`

export default InfinityScrollCollectionContainer;