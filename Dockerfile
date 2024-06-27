FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

ENV PATH="/usr/local/bin:${PATH}"

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]
