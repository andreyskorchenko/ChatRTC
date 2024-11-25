FROM node:20.18.0-alpine AS build
WORKDIR /opt/chatrtc/frontend
ADD package*.json .
RUN npm ci
ADD . .
RUN npm run build

FROM node:20.18.0-alpine
WORKDIR /opt/chatrtc/frontend
ADD package*.json .
ADD ./.env .
RUN npm ci --omit=dev
COPY --from=build /opt/chatrtc/frontend/dist dist
RUN npm i serve -g
CMD ["serve", "-s", "dist"]
EXPOSE 8080
