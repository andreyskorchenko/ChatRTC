FROM node:20.18.0-alpine AS build
WORKDIR /opt/apps/chatrtc/frontend
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /opt/apps/chatrtc/frontend/dist /usr/share/nginx/html
COPY --from=build /opt/apps/chatrtc/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
