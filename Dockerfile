FROM node:12.0.0 as build-step
WORKDIR /app
COPY . /app
RUN npm install --prefer-offline --no-audit && npm run build --prod 
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step app/dist/ishtar /usr/share/nginx/html
