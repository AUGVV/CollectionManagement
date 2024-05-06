import { mainPageStore } from "../Stores/MainPageStore";
import { observer } from "mobx-react";
import { useCallback, useEffect, useRef } from "react";
import { collectionTypesStore } from "../Stores/CollectionTypesStore";

import styled from "styled-components";
import CollectionItem from "./Elements/CollectionItem";
import PaginatedCollections from "./Elements/PaginatedCollections";
import TopContainer from "./StyledComponents/MainPage/TopContainer";
import SearchBar from "./Elements/StyledComponents/Common/SearchBar";
import Titleh2 from "./StyledComponents/MainPage/Titleh2";
import SelectBar from "./Elements/SelectBar";

const MainPage = observer(() => {
    const searchRef = useRef<HTMLInputElement>(null);
    const typesRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const fetch = async () => {
                await mainPageStore.GetTopItems();
                await collectionTypesStore.GetTypes();
                mainPageStore.currentPage = 0;
                await mainPageStore.GetCollectionItems(1, '', NaN);
        };

        fetch();
    }, []);

    const handlePageClick = useCallback(async (event: { selected: number; }) => {
        mainPageStore.currentPage = event.selected;
        const newOffset = event.selected + 1;
        await mainPageStore.GetCollectionItems(
            newOffset,
            searchRef.current!.value,
            Number(typesRef.current!.value));
    }, [searchRef, typesRef]);

    const handleSearchChange = useCallback(async () => {
        await mainPageStore.GetCollectionItems(
            1,
            searchRef.current!.value,
            Number(typesRef.current!.value)
        );
    }, [searchRef, typesRef]);

    const handleTypeChange = useCallback(async () => {
        console.log(typesRef.current?.value);
        await mainPageStore.GetCollectionItems(
            1,
            searchRef.current!.value,
            Number(typesRef.current!.value)
        );
    }, [searchRef, typesRef]);

    return (<>
        <div>
            <Titleh2>Top collections</Titleh2>
            <TopContainer>
                {mainPageStore.topItems.map((item) => (
                    <CollectionItem item={item} />
                ))}
            </TopContainer>
            <OtherSearchContainer>
                <Titleh2>Other collections</Titleh2>
                <SearchBar
                    ref={searchRef}
                    onChange={handleSearchChange}
                    placeholder="Search by title or description"></SearchBar>
                <SelectBar handleTypeChange={handleTypeChange} ref={typesRef} typesList={collectionTypesStore.types} />
            </OtherSearchContainer>
            <PaginatedCollections
                currentPage={mainPageStore.currentPage}
                totalCount={mainPageStore.GetTotalCount}
                items={mainPageStore.items}
                onPageChange={handlePageClick} />
        </div>
    </>);
})

const OtherSearchContainer = styled.div
    `display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
     @media (max-width: 880px) {
            display: flex;
            flex-direction: column;
            align-items: center;
     }`

export default MainPage;