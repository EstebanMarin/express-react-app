import React from "react";
import { Input } from "./components/InputComponent";
import { GlobalStyle, InnerContainer } from "./components/GlobalStyle"
import ShowDetails from "./components/DetailsComponent"
import { useTwilioHook, actionTypes } from "./hooks"


const handleChange = dispatch => e => dispatch({ type: actionTypes.SEARCH_TERM, payload: e.target.value })
const handleEnter = dispatch => ({ keyCode, which }) => (keyCode === 13 || which === 13) && dispatch({ type: actionTypes.ENTER_KEY_PRESSED, dispatch })
const isEmpty = obj => Object.keys(obj).length === 0


export default function MainContent() {
  const [{ searchTerm, userDetail, getSuggetions }, dispatch] = useTwilioHook()
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
