import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { mainPageStore } from "../Stores/MainPageStore";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { collectionTypesStore } from "../Stores/CollectionTypesStore";
import CollectionItem from "./Elements/CollectionItem";

const CollectionItemPage = observer(() => {
    const searchRef = useRef<HTMLInputElement>(null);
    const typesRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const fetch = async () => {
            setTimeout(async () => {
                await mainPageStore.GetTopItems();
                await collectionTypesStore.GetTypes();
                await mainPageStore.GetCollectionItems(1, '', NaN);
            }, 100);
        };

        fetch();
    }, []);

    const handlePageClick = async (event: { selected: number; }) => {
        mainPageStore.currentPage = event.selected;
        const newOffset = event.selected + 1;
        await mainPageStore.GetCollectionItems(
            newOffset,
            searchRef.current!.value,
            Number(typesRef.current!.value));
    };

    return (<>
        <div>
            <Title>Top collections</Title>
            <Container>
                {mainPageStore.topItems.map((item) => (
                    <CollectionItem item={item} />
                ))}
            </Container>
            <OtherSearchContainer>
                <Title>Other collections</Title>
                <SearchBar
                    ref={searchRef}
                    onChange={async () => await mainPageStore.GetCollectionItems(
                        1,
                        searchRef.current!.value,
                        Number(typesRef.current!.value))}
                    placeholder="Search by title or description"></SearchBar>
                <SelectBar
                    onChange={async () => await mainPageStore.GetCollectionItems(
                        1,
                        searchRef.current!.value,
                        Number(typesRef.current!.value))}
                    ref={typesRef}
                    required>
                    <option selected value={undefined}>none</option>
                    {collectionTypesStore.types.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </SelectBar>
            </OtherSearchContainer>
            <Container2>
                {mainPageStore.items.map((item) => (
                    <CollectionItem item={item} />
                ))}
            </Container2>
            <Paginator2
                pageCount={mainPageStore.GetTotalCount}
                forcePage={mainPageStore.currentPage}
                onPageChange={handlePageClick}
            />
        </div>
    </>);
})

const Container = styled.section
    `width: -webkit-fill-available;
     border-bottom: inset;
     display: flex;
     gap: 35px;
     flex-wrap: wrap;
     justify-content: center;
     align-items: center;
     flex-direction: row;
     align-content: center;
     padding-top: 30px;
     padding-bottom: 40px;
     padding-left: 20px;
     padding-right: 20px;
     border-top: inset;
     @media (max-width: 417px) {
        padding-left: 0px;
        padding-right: 0px;
     }`

const Container2 = styled.section
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

const SearchBar = styled.input
    `height: 30px;
     width: 50%;
     border-radius: 10px;
     @media (max-width: 880px) {
         width: 90%;
         margin-bottom: 10px;
     }`

const SelectBar = styled.select
    `height: 35px;
     width: 20%;
     border-radius: 6px;
     margin-right: 30px;
     @media (max-width: 880px) {
         margin-right: 0px;
         width: 50%;
     }`

const Title = styled.h2
    `margin-left: 30px;
     @media (max-width: 417px) {
         margin-left: 0px;
         text-align-last: center;
     }`

const Paginator2 = styled(ReactPaginate).attrs({
    activeClassName: 'active', // default to "selected"
})`
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style-type: none;
    align-items: center;
    border-top: groove;
    border-bottom: groove;
    padding-top: 10px;
    padding-bottom: 10px;

  li a {
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }     
  @media (max-width: 417px) {
     display: flex;
     justify-content: center;
     list-style-type: none;
     padding-inline-start: 0px;
  }
`;

export default CollectionItemPage;