import { observer } from "mobx-react";
import { authStore } from "../../Stores/AuthStore";

import userImage from '../../Images/DefaultUser.png';
import AuthButtonsContainer from "./StyledComponents/AuthButtonContainers";
import UserImageBig from "./StyledComponents/UserImageBig";

type Props = {
    click: React.MouseEventHandler<HTMLDivElement>
};

const LoginedUser = observer(({ click }: Props) => {
    return (<>
        <AuthButtonsContainer onClick={click}>
            <p>{authStore.GetUserNickname}</p>
            <UserImageBig src={userImage} />
        </AuthButtonsContainer>
    </>);
})

export default LoginedUser;