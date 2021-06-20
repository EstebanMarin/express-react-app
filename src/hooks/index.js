import { useReducer, useEffect } from "react";
import axios from "axios"

export const initialState = {
    searchTerm: "",
    userDetail: {},
    getSuggetions: []
};

export const actionTypes = {
    "SEARCH_TERM": "SEARCH_TERM",
    "GET_SUGGESTIONS": "GET_SUGGESTIONS",
    "ENTER_KEY_PRESSED": "ENTER_KEY_PRESSED",
    "UPDATE_USER_DETAILS": "UPDATE_USER_DETAILS"

}

export const reducer = (state, action) => {
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

export const useTwilioHook = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    //MVP alpha use useEffect to handle when enter, change in the state

    // useEffect(() => {
    //     async function getSuggestions() {
    //         console.log("hey there you  pressed enter")
    //         dispatch({ type: actionTypes.GET_SUGGESTIONS, payload: usersSuggestions })
    //     }
    //     getSuggestions()
    // }, [])


    return [state, dispatch]
}