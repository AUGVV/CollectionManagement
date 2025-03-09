import TagsLookupModel from '../../../Models/TagsLookupModel';
import TagButton from './StyledComponents/TagButton';
import TagCloudContainer from './StyledComponents/TagCloudContainer';

interface Props {
    tags: TagsLookupModel[];
    onTagClick: (tag: TagsLookupModel) => void;
}

const TagsCloud = ({ tags, onTagClick }: Props) => {
    return (
        <TagCloudContainer>
            {tags.map(tag => (
                <TagButton key={tag.id} onClick={() => onTagClick(tag)}>
                    {tag.value}
                </TagButton>
            ))}
        </TagCloudContainer>
    );
};

export default TagsCloud;