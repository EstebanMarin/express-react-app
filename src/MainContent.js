import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import { Input } from "./InputComponent";
import ShowDetails from "./DetailsComponent"
import axios from "axios"
import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16;
  }
  * {
    font-family: Helvetica;
  }
`

const initialState = {
  searchTerm: "",
  userDetail: {},
  getSuggetions: []
};

const actionTypes = {
  "SEARCH_TERM": "SEARCH_TERM",
  "GET_SUGGESTIONS": "GET_SUGGESTIONS",
  "ENTER_KEY_PRESSED": "ENTER_KEY_PRESSED",
  "UPDATE_USER_DETAILS": "UPDATE_USER_DETAILS"

}

const reducer = (state, action) => {
  switch (action.type) {
    // Implementation of Inmutability
    case actionTypes.SEARCH_TERM: return Object.assign({}, state, { searchTerm: action.payload })
    case actionTypes.GET_SUGGESTIONS: return Object.assign({}, state, { getSuggetions: action.payload })
    case actionTypes.UPDATE_USER_DETAILS: return Object.assign({}, state, { userDetail: action.payload, searchTerm: "" })
    // escape hatch for async data fetching
    case actionTypes.ENTER_KEY_PRESSED: {
      axios.get(`/api/users/${state.searchTerm}`)
        .then(result => action.dispatch({ type: actionTypes.UPDATE_USER_DETAILS, payload: result.data }))
    }
    default:
      return state
  }
}

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
