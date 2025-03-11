FROM node:20.18.0-alpine AS build
WORKDIR /opt/apps/chatrtc/frontend
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
# RUN npm run build && npm cache clean --force

FROM nginx:alpine
COPY --from=build /opt/apps/chatrtc/frontend/dist /usr/share/nginx/html
EXPOSE 80
