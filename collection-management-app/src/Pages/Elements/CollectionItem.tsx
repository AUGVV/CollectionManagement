import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";

import userImage from '../../Images/DefaultUser.png';
import CollectionModel from "../../Models/CollectionModel";
import Collections from "./StyledComponents/CollectionItem/Collections";
import ToolboxShadow from "./StyledComponents/CollectionItem/ToolboxShadow";
import ViewButton from "./StyledComponents/CollectionItem/ViewButton";
import ToolboxContainer from "./StyledComponents/CollectionItem/ToolboxContainer";
import TitleContainer from "./StyledComponents/CollectionItem/TitleContainer";
import Type from "./StyledComponents/CollectionItem/Type";
import Title from "./StyledComponents/CollectionItem/Title";
import DescriptionContainer from "./StyledComponents/CollectionItem/DescriptionContainer";
import Description from "./StyledComponents/CollectionItem/Description";
import WhiteButton from "./StyledComponents/CollectionItem/WhiteButton";
import TopBlockContainer from "./StyledComponents/CollectionItem/TopBlockContainer";
import CollectionImage from "./StyledComponents/CollectionItem/CollectionImage";

type Props = {
    item: CollectionModel,
    isAdmin?: boolean | undefined,
    removeHandle?: () => void | undefined,
    viewHandle?: () => void | undefined,
    editHandle?: () => void | undefined
};

const CollectionItem = ({ item, isAdmin, removeHandle, viewHandle, editHandle }: Props) => {
    const navigate = useNavigate();
    const [focused, setFocused] = useState(false)

    const handleMouseEnter = useCallback(() => {
        setFocused(true);
    }, [setFocused]);

    const handleMouseLeave = useCallback(() => {
        setFocused(false);
    }, [setFocused]);

    const controlViewHandle = useCallback(() => {
        if (viewHandle !== undefined) {
            viewHandle();
        }
    }, [viewHandle])

    const controlRemoveHandle = useCallback(() => {
        if (removeHandle !== undefined) {
            removeHandle();
        }
    }, [removeHandle])

    const controlEditHandle = useCallback(() => {
        if (editHandle !== undefined) {
            editHandle();
        }
    }, [editHandle])

    const CollectionContent = useMemo(() => {
        if (isAdmin !== undefined && focused) {
            return (
                <ToolboxShadow>
                    <ViewButton onClick={controlViewHandle}>View</ViewButton>
                    <ToolboxContainer>
                        {isAdmin !== true ? <WhiteButton onClick={controlEditHandle}>Edit</WhiteButton> : null}
                        <WhiteButton onClick={controlRemoveHandle}>Remove</WhiteButton>
                    </ToolboxContainer>
                </ToolboxShadow>
            );
        } else {
            return (
                <>
                    <TopBlockContainer>
                        <CollectionImage src={userImage} />
                        <TitleContainer>
                            <Title>{item.title}</Title>
                            <Type>{item.collectionType}</Type>
                        </TitleContainer>
                    </TopBlockContainer>
                    <DescriptionContainer>
                        <Description>{item.description}</Description>
                    </DescriptionContainer>
                </>
            );
        }
    }, [editHandle, focused, isAdmin, item.collectionType, item.description, item.title, removeHandle, viewHandle]);

    return (<>
        <Collections
            onClick={() => isAdmin === undefined ? navigate(`/Collection/${item.id}`) : null}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {CollectionContent}
        </Collections>
    </>);
}

export default CollectionItem;