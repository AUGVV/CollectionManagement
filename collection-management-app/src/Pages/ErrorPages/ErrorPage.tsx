import { observer } from "mobx-react";
import styled from "styled-components";

type Props = {
    ErrorCode: string
};

const ErrorPage = observer((props: Props) => {
    return (
        <MainContainer>
            <Container>
                <ErrorCode>{props.ErrorCode}</ErrorCode>
                <Text>Something goes wrong</Text>
            </Container>
        </MainContainer>);
})

const MainContainer = styled.div
    `display: grid;
     position: absolute;
     height: 100%;
     width: 100%;
     align-items: center;
     justify-content: center;`

const Container = styled.div
    `display: flex;
     flex-direction: column;
     align-items: center;`

const ErrorCode = styled.h2
    `margin-top: 0px;
     margin-bottom: 0px;
     font-size: 120px;
     text-shadow: 7px 5px 14px #0000008a;`

const Text = styled.p
    `font-size: 22px;`

export default ErrorPage;