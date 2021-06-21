# Welcome

Thanks for checking out this repository. I intend to make it easy for you to explore it and also see the thought process. While also get you excited in the right bits, and well, forwarding my hiring process.

## Focusing on productivity in a dockerized environment 🐳 

> What a pleasure! you just run `docker compose up` and you can code away!
> -  _The only developer that has used this repo_

You are as fast as your local development environment => we offer a `multi-stage, multi build `Dockerfile`, and a `docker-compose up` that uses `Nginx`as a reverse proxy to avoid any `CORS` issues, as well as avoid rebuilding images with each code change (using `volume mount`) whist still have **HOT-RELOADING** for both *front* and *back*  🤯🤯🤯🤯🤯.

Don't like `docker`? no worries, we have `.nvmrc` so you can do local development as well .....

Get as well prettier, eslinter and commitlinter and don't forget **CHECKOUT** the postman collections, there you will find all the collections to test the API, use them for an end to end testing

## We are now ALFA 😅

There are still many things to improve, check out [Projects](https://github.com/EstebanMarin/express-react-app/projects), or [OPEN_ISSUES](https://github.com/EstebanMarin/express-react-app/issues), to get a full picture of the project

![Working Prototype](https://github.com/EstebanMarin/express-react-app/blob/mvp-alfa/EMM_app_GIF.gif)

# Thought process (why?)

Although, the technical challenge is straight on the results expected. 
I am assuming this as an **OPEN PROJECT REVIEW** as it is called in _twilio_ and deliver an "actual" **product**, this will make me assume **stuff**, but I hope these assumptions will trigger the conversation.


## Why not not Typescript. . . . **HERE** in this repo?

**TL;DR**: I dropped `typescript` support altogether => but I have very good reasons why
I originally intended to have both parts as `typescript` code bases but as the _front-end_ code is done with `react-scripts` setting that up to work just in `JS` and `typescript` backend part, had me fighting `commonjs` and `ESM`, and doing a balancing act with my `tsconfig.json`, `package.json`, `npm scripts`. More down below or check `master` branch commit `DEAD-END`

### My crazy run trying to upgrade the repo to `typescript` had me:

- Putting this beauty (🤢) into my `package.json` file:

```json
  "scripts": {
    "start": "npm run dev",
    "dev": "concurrently \"npm run server:dev\" \"npm run client:dev\"",
    "typescript-transpiled-dev": "concurrently \"npm run typescript:server:dev\" \"npm run client:dev\"",
    "client:dev": "react-scripts start",
    "typescript:server:dev": "nodemon ./dist/server/index.js",
    "server:dev": "nodemon --exec npm run \"server:babel\" server/index.js",
    "server:babel": "babel-node --presets='@babel/preset-env'",
    "typescript-build-dist": "./node_modules/typescript/bin/tsc",
    "test": "jest"
  },
```

- Using `tsc` just for `development` and triggering `nodemon` with a `typescript` compile
- Running: `mkdir dist && sudo chmod 777 dist` in the (`./`) directory, to allow `node`to run from `npm`, this to solve `unauthorized` issues.

