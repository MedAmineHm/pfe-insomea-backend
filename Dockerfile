# Utiliser l'image Node.js comme base
FROM node:14

# Créer le répertoire de travail de l'application dans l'image Docker
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json pour tirer parti du cache Docker
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application s'exécutera dans le conteneur Docker
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "app.js"]
