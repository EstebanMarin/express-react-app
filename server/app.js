import express from "express";
const axios = require("axios").default;
// axios.<method> will now provide autocomplete and parameter typings

// add middleware to cache

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

const isStatus200 = p => Promise.resolve(p)
  .then(
    val => ({ status: 'fulfilled', value: val }),
    err => ({ status: 'rejected', reason: err }));


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
  console.log("Hello there", username);
  //validate type
  //consolidate call
  //async call
  // dont make it eager
  const { data: allUsers } = await axios.get(`${friendsServices.listAll}`)
  const { data: userFriendsDetails } = await axios.get(`${friendsServices.detailUserName}${username}`)
  const { data: allUsersPlayInfo } = await axios.get(`${playServices.listAllUsers}`)
  const { data: userNamePlayDetails } = await axios.get(`${playServices.detailUserName}${username}`)

  // business logic
  const isUserPlay = username => play => play.username === username
  // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  const onlyUnique = (v, i, s) => s.indexOf(v) === i
  const URIFactory = s => `/${URI}/${s}`


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

  const variableArray = [
    "allUsers", "userFriendsDetails", "allUsersPlayInfo", "userNamePlayDetails"
  ]

  // generate header
  const lazyBody = () => ({
    username: username,
    friends: userFriendsDetails.friends.length,
    plays: allUsersPlayInfo.plays.filter(isUserPlay(username)).length,
    tracks: userNamePlayDetails.plays.filter(onlyUnique),
    uri: URIFactory(username)
  })


  // Promise.allSettled(promises).
  //   then((results) => console.log(results?.value));


  res.status(200).json(lazyBody());
});

export default app;
