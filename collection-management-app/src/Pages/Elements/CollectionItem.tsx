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

const CollectionItem = (props: Props) => {
    const navigate = useNavigate();
    const [focused, setFocused] = useState(false)

    const handleMouseEnter = useCallback(() => {
        setFocused(true);
    }, [setFocused]);

    const handleMouseLeave = useCallback(() => {
        setFocused(false);
    }, [setFocused]);

    const viewHandle = useCallback(() => {
        if (props.viewHandle !== undefined) {
            props.viewHandle();
        }
    }, [props])

    const removeHandle = useCallback(() => {
        if (props.removeHandle !== undefined) {
            props.removeHandle();
        }
    }, [props])

    const editHandle = useCallback(() => {
        if (props.editHandle !== undefined) {
            props.editHandle();
        }
    }, [props])

    const CollectionContent = useMemo(() => {
        if (props.isAdmin !== undefined && focused) {
            return (
                <ToolboxShadow>
                    <ViewButton onClick={viewHandle}>View</ViewButton>
                    <ToolboxContainer>
                        {props.isAdmin !== true ? <WhiteButton onClick={editHandle}>Edit</WhiteButton> : null}
                        <WhiteButton onClick={removeHandle}>Remove</WhiteButton>
                    </ToolboxContainer>
                </ToolboxShadow>
            );
        } else {
            return (
                <>
                    <TopBlockContainer>
                        <CollectionImage src={userImage} />
                        <TitleContainer>
                            <Title>{props.item.title}</Title>
                            <Type>{props.item.collectionType}</Type>
                        </TitleContainer>
                    </TopBlockContainer>
                    <DescriptionContainer>
                        <Description>{props.item.description}</Description>
                    </DescriptionContainer>
                </>
            );
        }
    }, [editHandle, focused, props.isAdmin, props.item.collectionType, props.item.description, props.item.title, removeHandle, viewHandle]);

    return (<>
        <Collections
            onClick={() => props.isAdmin === undefined ? navigate(`/Collection/${props.item.id}`) : null}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {CollectionContent}
        </Collections>
    </>);
}

export default CollectionItem;