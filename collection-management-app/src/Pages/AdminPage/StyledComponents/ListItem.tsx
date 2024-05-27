import styled from "styled-components";

const ListItem = styled.li
    `height: 60px;
     display: block;
     border-bottom: solid;
     text-align: left;
     display: grid;
     align-items: center;
     grid-template-columns: repeat(4, minmax(0, 1fr));
     & a:first-child {
        margin-left: 20px
     }
     & p {
         overflow: hidden;
         text-overflow: ellipsis;
         text-align: center;
     }
     @media (max-width: 417px) {
           height: auto;
           display: flex;
           align-items: center;
           grid-template-columns: repeat(4, minmax(0, 1fr));
           flex-direction: column;
            & a:first-child {
                margin-top: 10px;
                margin-left: 0px;
            }
     }`

export default ListItem;