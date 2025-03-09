import CollectionModel from "../../Models/CollectionModel";
import { FixedSizeList as List } from 'react-window';
import CollectionItemLong from "../Elements/CollectionItemLong";
import React, { useEffect, useState } from "react";
import InfinityScrollCollectionContainer from "./StyledComponents/InfinityScrollCollectionContainer";
import './CSS/InfinityScrollContainer.css';

type Props = {
    items: CollectionModel[],
    itemsLength: number,
    loadMoreItems(): void,
};

type ItemProps = {
    index: number;
    style: React.CSSProperties;
};

const InfinityScrollCollection = (props: Props) => {

    const [itemSize, setItemSize] = useState(60); 
    const handleResize = () => {
        if (window.innerWidth < 418) {
            setItemSize(120);
        }
        else {
            setItemSize(60);
        }
    };
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const CollectionItemLongMemo = React.memo(CollectionItemLong);

    const Row: React.FC<ItemProps> = ({ index, style }) => {
        return <div className={'InfinityScrollItemStyle'} style={style}> <CollectionItemLongMemo item={props.items[index]} position={0} /> </div> 
    };

    return (<>

        <InfinityScrollCollectionContainer>
            <List
            height={560}
            itemCount={props.itemsLength}
            itemSize={itemSize}
            width={'100%'}
            className={'InfinityScrollStyle'}
            onItemsRendered={({ visibleStopIndex }) => {
                if (visibleStopIndex === props.itemsLength - 1) {
                    props.loadMoreItems();
                }
            }}>
            {Row}
            </List>
        </InfinityScrollCollectionContainer>   
    </>);
}

export default InfinityScrollCollection;