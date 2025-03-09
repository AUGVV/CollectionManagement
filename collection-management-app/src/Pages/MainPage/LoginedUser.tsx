import { observer } from "mobx-react";
import { authStore } from "../../Stores/AuthStore";

import userImage from '../../Images/DefaultUser.png';
import UserImageBig from "./StyledComponents/UserImageBig";
import AuthButtonsContainer from "../../Components/Header/Authorization/StyledComponents/AuthButtonContainers";

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