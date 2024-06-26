# Utilisation d'une image de base Node.js avec version spécifique
FROM node:20

# Création du répertoire de travail de l'application
WORKDIR /app

# Copie du fichier package.json et package-lock.json (le cas échéant)
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Installation d'Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Installation d'Infracost
RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Ajout du chemin d'Infracost au PATH
ENV PATH="/usr/local/bin:${PATH}"

# Copie du reste des fichiers de l'application
COPY . .

# Exposition du port si nécessaire
EXPOSE 3001

# Commande par défaut pour démarrer l'application
CMD [ "npm", "start" ]
