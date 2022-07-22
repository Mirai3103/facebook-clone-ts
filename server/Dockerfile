FROM node:16
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY yarn.lock ./
COPY ./ ./
RUN  npm i -g typescript
RUN yarn install
RUN yarn build



CMD ["yarn", "start"]
