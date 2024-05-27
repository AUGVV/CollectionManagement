import styled from "styled-components";
import ReactPaginate from "react-paginate";
import CollectionModel from "../../Models/CollectionModel";
import CollectionContainer from "./StyledComponents/PaginatedCollections/CollectionContainer";
import CollectionItem from "./CollectionItem";
import CollectionsPaginator from "./StyledComponents/PaginatedCollections/CollectionsPaginator";

type Props = {
    items: CollectionModel[],
    totalCount: number,
    currentPage: number,
    onPageChange?(selectedItem: { selected: number }): void,
};

const PaginatedCollections = (props: Props) => {
    return (<>
            <CollectionContainer>
                {props.items.map((item) => (
                    <CollectionItem item={item} />
                ))}
            </CollectionContainer>
            <CollectionsPaginator
                pageCount={props.totalCount}
                forcePage={props.currentPage}
                onPageChange={props.onPageChange}
            />
    </>);
}

export default PaginatedCollections;