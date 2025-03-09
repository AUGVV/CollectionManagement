import { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const ItemPage = observer(() => {
    const EmailInputRef = useRef<HTMLInputElement>(null);
    const PasswordInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    return (
        <MainContainer>
            <MainInfoContainer>
                <img></img>
                <div>
                </div>
            </MainInfoContainer>
            <SomeInfoContainer>
            </SomeInfoContainer>
            <CommentsContainer>
            </CommentsContainer>
        </MainContainer>);
});

const MainContainer = styled.div
    `display: flex;
     position: absolute;
     height: 100%;]]]]]
     width: 100%;
     flex-direction: column;`

const MainInfoContainer = styled.div
    `background-color: aqua;
     min-height: 360px;`

const SomeInfoContainer = styled.div
    `background-color: #363c63;
     min-height: 200px;`

const CommentsContainer = styled.div
    `height: 100%;
     background-color: #041004;
     min-height: 200px;`

export default ItemPage;