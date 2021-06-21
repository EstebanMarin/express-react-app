import express from "express";
import { friendsURL, playURL } from "./constants"
import { anyRejectionAnswer400 } from "./predicates"
import TwilioService from "./services";

//SERVICES singleton
const twilioService = new TwilioService(friendsURL, playURL)

const app = express();

app.get("/api/users/:username", async (req, res, next) => {
  // your code here!
  const { username } = req?.params;

  Promise.allSettled(twilioService.generatePromises(username))
    .then((results) => {
      console.log(`Hello ${username}`)
      anyRejectionAnswer400(results) ?
        res.status(400).json(twilioService.generateError(username)) :
        res.status(200).json(twilioService.generateBody(results, username))
    }).
    catch(error => res.status(500).json({ error: "no username" }))


});

export default app;
