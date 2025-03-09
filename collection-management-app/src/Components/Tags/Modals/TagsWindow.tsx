import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import ModalHeader from '../../Header/Authorization/Modals/StyledComponents/ModalHeader';
import CloseButton from '../../Header/Authorization/Modals/StyledComponents/CloseButton';
import LoginBox from '../../Header/Authorization/Modals/StyledComponents/LoginBox';
import TagsContainer from './StyledComponents/TagsContainer';
import AutoTagsInput from './AutoTagsInput';
import TagsCloud from './TagsCloud';
import { tagsModalStore } from '../../../Stores/Components/TagsModalStore';
import SelectedTagsContainer from './StyledComponents/SelectedTagsContainer';
import TagBox from './StyledComponents/TagBox';
import TagsCount from './StyledComponents/TagsCount';
interface Props {
    toggleLogin: () => void;
    onClose: () => void;
}

export const TagsWindow = observer(({ onClose }: Props) => {
    useEffect(() => {
        tagsModalStore.items = [];
        tagsModalStore.GetPopularTags();
    }, []);

    const tagClick = () => {
    };

    return (<>
        <TagsContainer>
            <TagBox>
                <ModalHeader>
                    <CloseButton onClick={onClose}>x</CloseButton>
                </ModalHeader>
                <AutoTagsInput></AutoTagsInput>
                <TagsCloud tags={tagsModalStore.popularTags} onTagClick={tagClick}></TagsCloud>
                <SelectedTagsContainer />
                <TagsCount>Available:50</TagsCount>
            </TagBox>
        </TagsContainer>
    </>);
});

export default TagsWindow;