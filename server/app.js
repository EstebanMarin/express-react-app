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

//constants
const twil_io = `https://mauvelous-leopard-5257.twil.io/`
const friendsService = {
  "listAll": `${twil_io}friends`,
  "detailUserName": `${twil_io}friend-detail?username=`
}

app.get("/api/users/:username", async (req, res) => {
  // your code here!
  const { username } = req?.params;
  console.log("Hello there", username);
  //validate type
  //consolidate call


  res.status(200).json({
    username: username,
    plays: 178,
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
