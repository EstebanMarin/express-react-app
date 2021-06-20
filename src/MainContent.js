import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import { Input } from "./InputComponent";
import ShowDetails from "./DetailsComponent"
import axios from "axios"
import { createGlobalStyle } from 'styled-components'
import { reducer, initialState, actionTypes } from "./reducer"


const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16;
  }
  * {
    font-family: Helvetica;
  }
`

const handleChange = dispatch => e => dispatch({ type: actionTypes.SEARCH_TERM, payload: e.target.value })
const handleEnter = dispatch => ({ keyCode, which }) => (keyCode === 13 || which === 13) && dispatch({ type: actionTypes.ENTER_KEY_PRESSED, dispatch })
const isEmpty = obj => Object.keys(obj).length === 0

export const InnerContainer = styled.div`
  height: 70vh;
  width: 100%;
  line-height: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function MainContent() {
  const [{ searchTerm, userDetail, getSuggetions }, dispatch] = useReducer(reducer, initialState)

  //MVP alpha use useEffect to handle when enter, change in the state

  // useEffect(() => {
  //   async function getSuggestions() {
  //     const { data: userDetails } = await axios.get(`/api/users/suggestions`);
  //     dispatch({ type: actionTypes.GET_SUGGESTIONS, payload: usersSuggestions })
  //   }
  //   getSuggestions()
  // }, [])

  return (
    <>
      <GlobalStyle />
      <InnerContainer>
        <Input
          id="input"
          value={searchTerm}
          onChange={handleChange(dispatch)}
          type={"text"}
          onKeyPress={handleEnter(dispatch)}
        />
        {isEmpty(userDetail) ? console.log("nothing") : ShowDetails(userDetail)}
      </InnerContainer>
    </>
  );
}
