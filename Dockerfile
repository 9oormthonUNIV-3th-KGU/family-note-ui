FROM node

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN rm -rf node_modules
RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 5173/tcp

CMD ["pnpm", "run", "dev"]