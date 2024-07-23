FROM node:20

WORKDIR /app

# Copier les fichiers de dépendances Node.js
COPY package*.json ./
RUN npm install

# Installer Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Installer Infracost
RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Ajouter Infracost au PATH
ENV PATH="/usr/local/bin:${PATH}"

# Copier le répertoire terraform-codes dans le conteneur
COPY terraform-codes /terraform-codes

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3001

# Définir la commande par défaut
CMD ["npm", "run", "start:prod"]

# Vérification de l'installation d'Infracost
RUN infracost --version
