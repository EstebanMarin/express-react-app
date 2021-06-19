FROM node:14.17 as base
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY .babelrc ./
RUN npm i

FROM base as backend
ENV NODE_ENV=dev
EXPOSE 8080
ENV PORT 8080
# Volume loading for hot reloading
COPY /server ./server
CMD npm run server:dev

FROM base as frontend
ENV NODE_ENV=dev
EXPOSE 3000
ENV PORT 3000
# Volume loading for hot reloading
COPY /src ./src
COPY /public ./public
CMD npm run client:dev

FROM nginx as reverseproxy
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf