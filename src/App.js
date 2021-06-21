import React from "react";
import { Input } from "./components/InputComponent";
import { GlobalStyle, InnerContainer } from "./components/GlobalStyle"
import ShowDetails from "./components/DetailsComponent"
import { useTwilioHook, actionTypes } from "./hooks"


const handleChange = dispatch => ({ target: { value } }) => dispatch({ type: actionTypes.SEARCH_TERM, payload: value })
const handleEnter = dispatch => ({ keyCode, which }) => (keyCode === 13 || which === 13) && dispatch({ type: actionTypes.ENTER_KEY_PRESSED, dispatch })
const isEmpty = obj => Object.keys(obj).length === 0


export default function MainContent() {
  const [{ searchTerm, userDetail, futureAPIImplementations }, dispatch] = useTwilioHook()
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
        <p>Not sure what username to type? <a target="_blank" href="https://mauvelous-leopard-5257.twil.io/friends">Check here for inspiration! or just type</a>  <strong>antony_cassinelli</strong> </p>
        {isEmpty(userDetail) ? console.log("nothing") : ShowDetails(userDetail)}
      </InnerContainer>
    </>
  );
}
