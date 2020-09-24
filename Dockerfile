FROM node:12.0.0 as build-step
 
WORKDIR /app

COPY package.json /app

RUN npm install --quiet --no-progress 

COPY . /app

RUN npm run build --prod --quiet

# Stag
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-step app/dist/ishtar /usr/share/nginx/html
