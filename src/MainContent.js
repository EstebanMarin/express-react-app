import React, { useReducer, useEffect } from "react";
import { InnerContainer, Input } from "./styles";
import axios from "axios"

function useFetchUsers(username = "ray_benigno") {
  const [users, setUsers] = React.useState();
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();

  React.useEffect(() => {
    async function fetchUser() {
      try {
        setUsers();
        setError();
        setIsLoading(true);

        const response = await axios.get(`/api/users/${username}`);
        const userResponse = await response.json();

        setUsers(userResponse);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { users, isLoading, error };
}

const mockInput = "ray_benigno"

const initialState = {
  searchTerm: "",
  userDetail: {}
};

const actionTypes = {
  "SEARCH_TERM": "SEARCH_TERM",
  "GET_SUGGESTIONS": "GET_SUGGESTIONS",
  "ENTER_KEY_PRESSED": "ENTER_KEY_PRESSED"

}

const reducer = (state, action) => {
  switch (action.type) {
    // Implementation of Inmutability
    case actionTypes.SEARCH_TERM: return Object.assign({}, state, { searchTerm: action.payload })
    case actionTypes.GET_SUGGESTIONS: return Object.assign({}, state, { userDetail: action.payload })
    case actionTypes.ENTER_KEY_PRESSED: {
      // dispacher available through action.dispatch
      // chech for user before calling api
      console.log(`serch-term: ${state.searchTerm}`)
      axios.get(`/api/users/${state.searchTerm}`)
        .then(result => console.log("fetching", result.data))
      return Object.assign({}, state, { searchTerm: "" })
    }
    default:
      return state
  }
}

const handleChange = dispatch => e => dispatch({ type: actionTypes.SEARCH_TERM, payload: e.target.value })
const handleEnter = dispatch => ({ keyCode, which }) => (keyCode === 13 || which === 13) && dispatch({ type: actionTypes.ENTER_KEY_PRESSED, dispatch })

export default function MainContent() {
  const [state, dispatch] = useReducer(reducer, initialState)
  // action factory that attaches the dispacher
  const thunk = username => dispatch => { }

  // useEffect(() => {
  //   async function getSuggestions() {
  //     const { data: userDetails } = await axios.get(`/api/users/ray_benigno`);
  //     dispatch({ type: actionTypes.GET_SUGGESTIONS, payload: userDetails })
  //   }
  //   getSuggestions()
  // }, [])

  return (
    <>
      <InnerContainer>
        <Input
          id="input"
          value={state?.searchTerm}
          onChange={handleChange(dispatch)}
          type={"text"}
          onKeyPress={handleEnter(dispatch)}
        />
      </InnerContainer>
    </>
  );
}
