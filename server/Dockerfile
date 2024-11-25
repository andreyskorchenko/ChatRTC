FROM node:20.18.0-alpine AS build
WORKDIR /opt/chatrtc/backend
ADD package*.json .
RUN npm ci
ADD . .
RUN npm run build

FROM node:20.18.0-alpine
WORKDIR /opt/chatrtc/backend
ADD package*.json .
RUN npm ci --omit=dev
COPY --from=build /opt/chatrtc/backend/dist dist
CMD [ "npm", "run", "start:prod" ]
EXPOSE 3000
