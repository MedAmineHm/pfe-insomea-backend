###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm ci
COPY . .

COPY backend.env ./

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
# Copy the source code and install dependencies
COPY . .
# Install dependencies and build the project
RUN npm ci
RUN npm run build

ENV NODE_ENV production

# Reinstall node_modules with production dependencies and rebuild native modules
RUN npm ci --only=production && npm rebuild bcrypt && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY backend.env ./

CMD [ "node", "dist/main.js" ]
