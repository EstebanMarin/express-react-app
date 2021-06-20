import express from "express";
import axios from "axios"
import { URI, friendsServices, playServices } from "./constants"
import {
  isUserPlay,
  onlyUnique,
  URIFactory,
  anyRejectionAnswer400
} from "./predicates"

const app = express();

app.get("/api/users/:username", async (req, res, next) => {
  // your code here!
  const { username } = req?.params;


  const allUserFriendsPromise = axios.get(`${friendsServices.listAll}`)
  const userFriendsDetailsPromise = axios.get(`${friendsServices.detailUserName}${username}`)
  const allUsersPlayInfoPromise = axios.get(`${playServices.listAllUsers}`)
  const userNamePlayDetailsPromise = axios.get(`${playServices.detailUserName}${username}`)

  const promises = [
    allUserFriendsPromise,
    userFriendsDetailsPromise,
    allUsersPlayInfoPromise,
    userNamePlayDetailsPromise
  ]

  const generateBody = result => {
    const dataCleanup = answer => answer?.value?.data
    const [
      allUserFriends,
      userFriendsDetails,
      allUsersPlayInfo,
      userNamePlayDetails
    ] = result.map(dataCleanup)


    return {
      username: username,
      friends: userFriendsDetails.friends.length,
      plays: allUsersPlayInfo.plays.filter(isUserPlay(username)).length,
      tracks: userNamePlayDetails.plays.filter(onlyUnique),
      uri: URIFactory(username)
    }
  }

  Promise.allSettled(promises)
    .then((results) => {
      console.log(`Hello ${username}`)
      anyRejectionAnswer400(results) ?
        res.status(400).json({ error: "no username" }) :
        res.status(200).json(generateBody(results))
    }).
    catch(error => res.status(500).json({ error: "no username" }))


});

export default app;
