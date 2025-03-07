FROM node:20.18.0-alpine AS build
WORKDIR /opt/apps/chatrtc/frontend
ADD package*.json .
RUN npm ci
ADD . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /opt/apps/chatrtc/frontend/dist /usr/share/nginx/html
EXPOSE 80
