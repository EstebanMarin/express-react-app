import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16;
  }
  * {
    font-family: Helvetica;
  }
`

export const InnerContainer = styled.div`
  height: 70vh;
  width: 100%;
  line-height: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`