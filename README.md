# Welcome 

thanks for checking out this repository. I intend to make it easy for you to explore it and also see the though process. While also get you excited in the right parts, and well, forwarding my hiring process.

# Thought process (why?)

Although, the technical challenge is straight forward in what it wants. I want to play the role to which I am applying and assuming this as a **OPEN PROJECT REVIEW** as it is called in *twilio* and deliver an "actual" **product**, this will make me assume **stuff**, but I hepe these assumtions will trigger the conversation. 

## Stabilizing the Local environment, focusing on my developer experience and a scalability from the beginning 
I am as effective as my tools and having a local stable environment to debug is highly productive.
Therefore, I created this repository, that focused on developer experience, `npm scripts`to help the ramp up, start `Local dev` and also, (hopefully) build containers so serve k8s clusters using `Github` actions.
## Typescript for backend development, JS in the Front
I originally intended to have both parts as `typescript` code bases but as the *front-end* code is done with `react-scripts` setting that up was a nightmare. I also tried balacing `tsconfig.json`, `package.json`, `npm scripts` to build whats need it. I ended up doing the following. 

### My crazy run trying to migrate the repo to `typescript`
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
- The sweet spot is to install core Types and anything related to typescript as a dev dependency and this, will help us manage bundle sizes, and also ensuring not to ship useless `ts` (`types`) to server nor the client. 
- We will be using `typescript` just for our `development` environment, with the `sourceMap` flags on to enable debugging, while being mind-full that these files should not be shipped to `production`
- Running: `mkdir dist && sudo chmod 777 dist` in your (`./`) directory, to allow the scripts to run. Come here if you run with `unauthorized` issues when running `npm scripts`

# What are we building? (What)

As mentioned before this is a two part system.
## Front-end

## Backed-end
## Containers, CI/CD and more
