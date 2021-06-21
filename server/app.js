import express from "express";
import axios from "axios"
import { friendsURL, playURL } from "./constants"
import { anyRejectionAnswer400 } from "./predicates"
import TwilioService from "./services";

//SERVICES singleton
const twilioService = new TwilioService(friendsURL, playURL)

const app = express();

app.get("/api/users/:username", async (req, res, next) => {
  // your code here!
  const { username } = req?.params;


  // const allUserFriendsPromise = axios.get(`${friendsURL.listAll}`)
  // const userFriendsDetailsPromise = axios.get(`${friendsURL.detailUserName}${username}`)
  // const allUsersPlayInfoPromise = axios.get(`${playURL.listAllUsers}`)
  // const userNamePlayDetailsPromise = axios.get(`${playURL.detailUserName}${username}`)

  // const promises = [
  //   allUserFriendsPromise,
  //   userFriendsDetailsPromise,
  //   allUsersPlayInfoPromise,
  //   userNamePlayDetailsPromise
  // ]

  // const generateBody = result => {
  //   const dataCleanup = answer => answer?.value?.data
  //   const [
  //     allUserFriends,
  //     userFriendsDetails,
  //     allUsersPlayInfo,
  //     userNamePlayDetails
  //   ] = result.map(dataCleanup)


  //   return {
  //     username: username,
  //     friends: userFriendsDetails.friends.length,
  //     plays: allUsersPlayInfo.plays.filter(isUserPlay(username)).length,
  //     tracks: userNamePlayDetails.plays.filter(onlyUnique),
  //     uri: URIFactory(username)
  //   }
  // }

  const promises = twilioService.generatePromises(username)

  Promise.allSettled(promises)
    .then((results) => {
      console.log(`Hello ${username}`)
      anyRejectionAnswer400(results) ?
        res.status(400).json(twilioService.generateError(username)) :
        res.status(200).json(twilioService.generateBody(results, username))
    }).
    catch(error => res.status(500).json({ error: "no username" }))


});

export default app;
