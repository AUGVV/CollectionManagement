import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";

import userImage from '../../Images/DefaultUser.png';
import CollectionModel from "../../Models/CollectionModel";
import ToolboxShadow from "./StyledComponents/CollectionItem/ToolboxShadow";
import ViewButton from "./StyledComponents/CollectionItem/ViewButton";
import ToolboxContainer from "./StyledComponents/CollectionItem/ToolboxContainer";
import TitleContainer from "./StyledComponents/CollectionItem/TitleContainer";
import Type from "./StyledComponents/CollectionItem/Type";
import Title from "./StyledComponents/CollectionItem/Title";
import WhiteButton from "./StyledComponents/CollectionItem/WhiteButton";
import CollectionImage from "./StyledComponents/CollectionItem/CollectionImage";
import CollectionContainer from "./StyledComponents/CollectionItemLong/CollectionContainer";
import LeftBlockContainer from "./StyledComponents/CollectionItemLong/LeftBlockContainer";
import RightBlockContainer from "./StyledComponents/CollectionItemLong/RightBlockContainer";
import DescriptionLong from "./StyledComponents/CollectionItemLong/DescriptionLong";
import FlyNum from "./StyledComponents/CollectionItemLong/FlyNum";

type Props = {
    item: CollectionModel,
    position: number,
    isAdmin?: boolean | undefined,
    removeHandle?: () => void | undefined,
    viewHandle?: () => void | undefined,
    editHandle?: () => void | undefined
};

const CollectionItemLong = ({ item, position, isAdmin, removeHandle, viewHandle, editHandle }: Props) => {
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

    const numbers = useMemo(() => {
        const generatedNumbers = [];
        for (let i = 0; i < 10; i++) {
            generatedNumbers.push({
                number: position,
                top: Math.random() * 100,
                left: Math.random() * 100,
                delay: Math.random() * 3,
                duration: Math.random() * 2 + 2,
            });
        }
        return generatedNumbers;
    }, [position]);

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
                    <LeftBlockContainer>
                        <CollectionImage src={userImage} />
                        <TitleContainer>
                            <Title>{item.title}</Title>
                            <Type>{item.creator.nickname}</Type>
                        </TitleContainer>
                    </LeftBlockContainer>
                    <RightBlockContainer>
                        {focused
                            && position !== 0
                            && numbers.map((num, index) => (
                                <FlyNum
                                    key={index}
                                    top={num.top}
                                    left={num.left}
                                    delay={num.delay}
                                    duration={num.duration}
                                >
                                    {num.number}
                                </FlyNum>
                            ))}
                        <DescriptionLong>{item.description}</DescriptionLong>
                    </RightBlockContainer>
                </>
            );
        }
    }, [editHandle, focused, position, isAdmin, item.collectionType, item.description, item.title, removeHandle, viewHandle]);

    return (<>
        <CollectionContainer
            pos={position}
            onClick={() => isAdmin === undefined ? navigate(`/Collection/${item.id}`) : null}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {CollectionContent}
        </CollectionContainer>
    </>);
}

export default CollectionItemLong;