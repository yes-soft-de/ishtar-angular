FROM node:12.0.0 as build-step

RUN mkdir -p /app
 
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Stag
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-step app/dist/ishtar /usr/share/nginx/html
