import { mainPageStore } from "../Stores/MainPageStore";
import { observer } from "mobx-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { collectionTypesStore } from "../Stores/CollectionTypesStore";

import styled from "styled-components";
import Titleh2 from "./StyledComponents/MainPage/Titleh2";
import CollectionItemLong from "./Elements/CollectionItemLong";
import TopContainer from "./MainPage/StyledComponents/TopContainer";
import InfinityScrollCollection from "./MainPage/InfinityScrollCollection";
import CollectionModel from "../Models/CollectionModel";
import LastCollectionsContainer from "./MainPage/StyledComponents/LastCollectionsContainer";
import TagButton from "./MainPage/StyledComponents/TagButton";
import TagsWindow from "../Components/Tags/Modals/TagsWindow";

const MainPage = observer(() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [items, setItems] = useState<CollectionModel[]>([]);
    const [isToggleTags, setToggleTags] = useState(false);

    useEffect(() => {
        const fetch = async () => {
                await mainPageStore.GetTopItems();
                await collectionTypesStore.GetTypes();
                mainPageStore.currentPage = 0;
                await loadItems();
        };

        fetch();
    }, []);

    const toggleTags = useCallback(async () => {
        setToggleTags(prevState => !prevState);
    }, []);

    const loadItems = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await mainPageStore.LoadItems(items.length, 6, '', 0);
            setItems((prevItems) => [...prevItems, ...mainPageStore.items]);
        }
        finally {
            setIsLoading(false);
        }
    }, [items, isLoading]);

    return (<>
        <div>
            <Titleh2>Top collections</Titleh2>
            <TopContainer>
                {mainPageStore.topItems.map((item, index) => (
                    <CollectionItemLong item={item} key={index} position={index + 1} />
                ))}
            </TopContainer>
            <LastCollectionsContainer>
                <Titleh2>Last collections</Titleh2>
                <TagButton onClick={toggleTags}>Tags</TagButton>
                {isToggleTags && <TagsWindow onClose={toggleTags} toggleLogin={toggleTags} />}
            </LastCollectionsContainer>
            <InfinityScrollCollection
                items={items}
                itemsLength={items.length}
                loadMoreItems={loadItems}/>
        </div>
    </>);
})

export default MainPage;
