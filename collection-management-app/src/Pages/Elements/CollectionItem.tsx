import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

    const handleMouseEnter = () => {
        setFocused(true);
    }

    const handleMouseLeave = () => {
        setFocused(false);
    }

    return (<>
        <Collections
            onClick={() => props.isAdmin === undefined ? navigate(`/Collection/${props.item.id}`) : null}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {props.isAdmin !== undefined && focused
                ? <ToolboxShadow>
                    <ViewButton onClick={() => props.viewHandle}>View</ViewButton>
                    <ToolboxContainer>
                        {props.isAdmin !== true ? <WhiteButton onClick={() => props.editHandle}>Edit</WhiteButton> : null}
                        <WhiteButton onClick={() => props.removeHandle}>Remove</WhiteButton>
                    </ToolboxContainer>
                </ToolboxShadow>
                : <>
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
            }
        </Collections>
    </>);
}

export default CollectionItem;