# Welcome

thanks for checking out this repository. I intend to make it easy for you to explore it and also see the though process. While also get you excited in the right parts, and well, forwarding my hiring process.

# Thought process (why?)

Although, the technical challenge is straight forward in what it wants. I want to play the role to which I am applying and assuming this as a **OPEN PROJECT REVIEW** as it is called in _twilio_ and deliver an "actual" **product**, this will make me assume **stuff**, but I hepe these assumtions will trigger the conversation.

## Stabilizing the Local environment, focusing on my developer experience and a scalability from the beginning

I am as effective as my tools and having a local stable environment to debug is highly productive.
Therefore, I created this repository, that focused on developer experience, `npm scripts`to help the ramp up, start `Local dev` and also, (hopefully) build containers so serve k8s clusters using `Github` actions.

## Having prettier, eslinter and commitlinter

Thinking in the long run, all repos must have at least this to avoid format erros

## **CHECKOUT** the postman collections

In the `./postman` folder you will find all the collections to test the API, use them for end to end testing

## What happend with Typescript?

**TL;DR**: I dropped `typescript` support altoghether => but I have very good reasons why
I originally intended to have both parts as `typescript` code bases but as the _front-end_ code is done with `react-scripts` setting that up to work just in `JS` and `typescript` backend part, had me figting `commonjs` and `ESM`, and doing a balacing act with my `tsconfig.json`, `package.json`, `npm scripts`. More down below or check `master` branch commit `DEAD-END`

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

# What are we building? (What)

As mentioned before this is a two part system.

## Front-end

## Backed-end

## Containers, CI/CD and more
