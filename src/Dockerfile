FROM node:18
WORKDIR src/app
COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start"]
