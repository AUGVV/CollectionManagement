import styled from "styled-components";

const SearchBar = styled.input
    `height: 30px;
     width: 50%;
     border-radius: 10px;
     @media (max-width: 880px) {
         width: 90%;
         margin-bottom: 10px;
     }`

export default SearchBar;