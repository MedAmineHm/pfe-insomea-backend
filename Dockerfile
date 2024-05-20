###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

COPY backend.env ./

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .

COPY backend.env ./

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

# Recompiler les modules natifs
RUN npm rebuild bcrypt --build-from-source

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY backend.env ./

# Recompiler les modules natifs pour l'environnement de production
RUN npm rebuild bcrypt --build-from-source

# Exposer le port que l'application utilise
EXPOSE 3001

CMD [ "node", "dist/main.js" ]
