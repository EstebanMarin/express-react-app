import styled, { css } from "styled-components";

export const ValueWrapper = styled.input`
  width: 70%;
  padding-left: 8px;
  padding-right: 32px;
  height: 60px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #b6c1ce;
  line-height: 32px;
  font-size: xx-large;
`;

export const InnerContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Input = styled(ValueWrapper)`

`;