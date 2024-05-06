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
    item: CollectionModel
    isAdmin?: boolean
    removeHandle?: void
    viewHandle?: void
    editHandle?: void
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

    const CollectionContent = useMemo(() => {
        if (props.isAdmin !== undefined && focused) {
            return (
                <ToolboxShadow>
                    <ViewButton onClick={() => props.viewHandle}>View</ViewButton>
                    <ToolboxContainer>
                        {props.isAdmin !== true ? <WhiteButton onClick={() => props.editHandle}>Edit</WhiteButton> : null}
                        <WhiteButton onClick={() => props.removeHandle}>Remove</WhiteButton>
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
    }, [props.isAdmin, focused, props.item.title, props.item.collectionType, props.item.description, props.viewHandle, props.editHandle, props.removeHandle]);

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