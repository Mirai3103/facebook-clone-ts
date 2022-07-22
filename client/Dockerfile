FROM node:16 AS builder

WORKDIR /usr/src/app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./

RUN yarn
RUN yarn global add react-scripts@5.0.1 
RUN yarn run build
FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/src/app/build .
EXPOSE 80
# add app

# start app
# CMD ["serve", "-l", "3000", "-s", "build"]
ENTRYPOINT ["nginx", "-g", "daemon off;"]