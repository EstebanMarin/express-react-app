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

const isStatus200 = p => Promise.resolve(p)
  .then(
    val => ({ status: 'fulfilled', value: val }),
    err => ({ status: 'rejected', reason: err }));

const allSettled = promises =>
  Promise.all(promises.map(promise => promise
    .then(value => ({ state: 'fulfilled', value }))
    .catch(reason => ({ state: 'rejected', reason }))
  ));


function allPromisesSettled(promises) {
  return promises.map(isStatus200)
}



app.get("/api/users/:username", async (req, res) => {
  //constants
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
  const { data: userFriends } = await axios.get(`${friendsServices.listAll}`)
  const { data: userFriendsDetails } = await axios.get(`${friendsServices.detailUserName}${username}`)
  const { data: allUsersPlayInfo } = await axios.get(`${playServices.listAllUsers}`)
  const { data: userNamePlayDetails } = await axios.get(`${playServices.detailUserName}${username}`)

  console.log(userNamePlayDetails)
  res.status(200).json({
    username: username,
    // get unique of an array => https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    plays: userNamePlayDetails.plays.filter((v, i, s) => s.indexOf(v) === i).length,
    friends: 
  });
  // const friendsServicePromise =
  //   //cache?
  //   axios
  //     .get(
  //       `${friendsService.username}${username}`
  //     )
  //     .then(function (response) {
  //       // handle success
  //     })
  //     .catch(function (error) {
  //       // delegating error handling to client, making server more resilient, when error fetching. Agnostic to the response
  //       res.status(500).json({ error: "client to handle error" });
  //     })
  //     .then(function () {
  //       // logging for all purposes
  //       // logging process.env.INFO
  //       console.info(
  //         `RAN process on: ${username} from: ${req?.headers.host} in ${process.env.NODE_ENV}`
  //       );
  //     });
});

export default app;
