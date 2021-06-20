import express from "express";
const axios = require("axios").default;
// axios.<method> will now provide autocomplete and parameter typings

const app = express();

app.get(
  [
    // ignore; endpoint for easily viewing the default server
    // response on CodeSandbox
    "/",
    // endpoint initially used by the React app
    "/api/test-endpoint",
  ],
  (req, res) => {
    res.status(200).json({ test: "hello world! Esteban" });
  }
);




app.get("/api/users/:username", async (req, res, next) => {
  //constants
  const URI = `users`
  const twil_io = `https://mauvelous-leopard-5257.twil.io/`
  const friendsServices = {
    "listAll": `${twil_io}friends`,
    "detailUserName": `${twil_io}friend-detail?username=`
  }
  const playServices = {
    "listAllUsers": `${twil_io}plays`,
    "detailUserName": `${twil_io}plays-detail?username=`
  }
  // your code here!
  const { username } = req?.params;

  // predicates
  const isUserPlay = username => play => play.username === username
  // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  const onlyUnique = (v, i, s) => s.indexOf(v) === i
  const URIFactory = s => `/${URI}/${s}`
  const isRejectedPromise = promise => promise.status === 'rejected'
  const anyRejectionAnswer400 = results => results.filter(isRejectedPromise).length > 0


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
