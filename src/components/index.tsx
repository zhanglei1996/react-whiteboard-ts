import styled from "@emotion/styled"
import { Spin, Typography } from "antd"

export const FullPageLoading = () => {
    return <FullPageContainer>
        <Spin />
    </FullPageContainer>
}

export const FullPageErrorFallback = () => (
    <FullPageContainer>
        <Typography.Text type={"danger"}>页面出错啦</Typography.Text>
    </FullPageContainer>
);

const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
    }

    return <></>
}

export const FullPageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Row = styled.div<{
    gap?: number | string | boolean;
    iswrap?: boolean;
    between?: boolean;
    marginBottom?: number;
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    flex-wrap: ${props => props.iswrap ? 'wrap': 'no-wrap'};
    margin-bottom: ${(props) => typeof props.marginBottom === 'number' ? props.marginBottom + "rem" : undefined};
    > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
    typeof props.gap === "number"
      ? props.gap + "rem"
      : props.gap
        ? "2rem"
        : undefined};
  }
`