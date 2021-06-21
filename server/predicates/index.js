import { URI, friendsURL, playURL } from "../constants"
// predicates
export const isUserPlay = username => play => play.username === username
// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
export const onlyUnique = (v, i, s) => s.indexOf(v) === i
export const URIFactory = s => `/${URI}/${s}`
export const isRejectedPromise = promise => promise.status === 'rejected'
export const anyRejectionAnswer400 = results => results.filter(isRejectedPromise).length > 0
