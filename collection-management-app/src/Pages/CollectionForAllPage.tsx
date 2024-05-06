import styled from "styled-components";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { collectionStore } from "../Stores/CollectionStore";
import { Link, useParams } from "react-router-dom";

const CollectionForAllPage = observer(() => {
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            setTimeout(async () => {
                await collectionStore.GetCollectuons(Number(id));
            }, 100);
        };

        fetch();
    }, []);

    return (
        <div>
            <LinkItem to={`/`}>← back</LinkItem>
            <MainText>{collectionStore.collection?.title}</MainText>
            <Description>{collectionStore.collection?.description}</Description>
            <Container>
                <p>Likes: {collectionStore.collection?.likesCount}</p>
                <p>Comments: {collectionStore.collection?.commentsCount}</p>
                <p>Author: {collectionStore.collection?.creator.nickname}</p>
                <p>Type: {collectionStore.collection?.collectionType}</p>
            </Container>
        </div>
    );
})

const MainText = styled.h1
    `text-align-last: center;`

const Description = styled.p
    `margin-left: 20px;
     margin-right: 20px;
     white-space: normal;
     overflow-wrap: break-word;
     border-bottom-style: inset;
     border-top-style: inset;
     padding-top: 5px;
     padding-bottom: 5px;
     text-align-last: center;`;

const LinkItem = styled(Link)
    `position: absolute;
     margin-left: 20px;`;

const Container = styled.div
    `display: flex;
     justify-content: space-around;
     margin-left: 20px;
     margin-right: 20px;
     border-bottom: outset;
     @media (max-width: 590px) {
        display: flex;
        justify-content: space-around;
        border-bottom: outset;
        flex-direction: column;
        align-items: center;
     }`;

export default CollectionForAllPage;