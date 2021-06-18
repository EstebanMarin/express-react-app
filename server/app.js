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

// async function agregateData() {
//   try {
//     //fetch from all end points
//     const friends =
//   }
// }

app.get("/api/users/:username", async (req, res) => {
  // your code here!
  const username = req?.params?.username;
  console.log("Hello there", username);
  //validate type
  axios
    .get(
      `https://mauvelous-leopard-5257.twil.io/friend-detail?username=${username}`
    )
    .then(function (response) {
      // handle success
      console.log(response);
      res.status(200).json({
        username: req?.params?.username,
        plays: 178,
      });
    })
    .catch(function (error) {
      // delegating error handling to client, making server more resilient, when error fetching. Agnostic to the response
      console.log(error);
      res.status(500).json({ error: "client to handle error" });
    })
    .then(function () {
      // logging for all purposes
      // logging process.env.INFO
      console.info(
        `RAN process on: ${username} from: ${req?.headers.host} in ${process.env.NODE_ENV}`
      );
    });
});

export default app;
