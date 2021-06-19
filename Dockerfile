FROM node:14.17 as base
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY .babelrc ./
RUN npm i

FROM base as backend
ENV NODE_ENV=production
EXPOSE 8080
ENV PORT 8080
# Volume loading for hot reloading
COPY /server ./server
CMD npm run server:dev