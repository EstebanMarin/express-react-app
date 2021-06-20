import React, { useReducer, useEffect } from "react";
import { InnerContainer, Input } from "./InputComponent";
import axios from "axios"

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
    case actionTypes.UPDATE_USER_DETAILS: return Object.assign({}, state, { userDetail: action.payload })
    case actionTypes.ENTER_KEY_PRESSED: {
      // dispacher available through action.dispatch
      // chech for user before calling api
      console.log(`serch-term: ${state.searchTerm}`)
      axios.get(`/api/users/${state.searchTerm}`)
        // dispatch update 
        .then(result => action.dispatch({ type: actionTypes.UPDATE_USER_DETAILS, payload: result.data }))
    }
    default:
      return state
  }
}

const handleChange = dispatch => e => dispatch({ type: actionTypes.SEARCH_TERM, payload: e.target.value })
const handleEnter = dispatch => ({ keyCode, which }) => (keyCode === 13 || which === 13) && dispatch({ type: actionTypes.ENTER_KEY_PRESSED, dispatch })
const isEmpty = obj => Object.keys(obj).length === 0

const showDetails = props => {
  const { username, plays, friends, tracks, uri } = props
  return <div>
    `${username, plays, friends, uri, tracks}`
  </div >
}

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
      <InnerContainer>
        <Input
          id="input"
          value={searchTerm}
          onChange={handleChange(dispatch)}
          type={"text"}
          onKeyPress={handleEnter(dispatch)}
        />
        <p>ray_benigno</p>
        {isEmpty(userDetail) ? console.log("nothing") :
          showDetails(userDetail)
        }
      </InnerContainer>
    </>
  );
}
