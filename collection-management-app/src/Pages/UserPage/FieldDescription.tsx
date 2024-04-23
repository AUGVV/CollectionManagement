import FieldDescriptionContainer from "./StyledComponents/FieldDescriptionContainer";
import Description from "./StyledComponents/Description";
import TitleText from "./StyledComponents/TitleText";

interface Props {
    title: string;
    description: string;
}

const FieldDescription = ({ title, description }: Props) => {
    return (<>
        <FieldDescriptionContainer>
            <TitleText>{title}</TitleText><Description>{description}</Description>
        </FieldDescriptionContainer>
    </>);
}

export default FieldDescription;
