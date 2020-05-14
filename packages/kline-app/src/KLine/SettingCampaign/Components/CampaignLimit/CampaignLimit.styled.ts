import styled from "styled-components";

const Styled = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    .ant-btn-icon-only {
        width: 22px;
        height: 22px;
        font-size: 12px;
        margin: 4px;
        min-width: 22px;
    }
    .icon-button {
        width: 22px;
        height: 22px;
        font-size: 12px;
        min-width: 22px;
        margin: 4px;
        margin-top: 24px;
        display: flex;
        align-self: center;
        justify-content: center;
    }
    .level {
        margin-top: -16px;
    }
    .input-full-width {
        width: 100%;
    }
    .form-item {
        width: 100%;
        margin-bottom: 0px;
    }
`;

export { Styled };
