FROM node:20.18.0-alpine AS build
WORKDIR /opt/apps/chatrtc/backend
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:20.18.0-alpine
WORKDIR /opt/apps/chatrtc/backend
COPY package*.json .
RUN npm ci --omit=dev
COPY --from=build /opt/apps/chatrtc/backend/dist dist
CMD [ "npm", "run", "start:prod" ]
EXPOSE 3000
