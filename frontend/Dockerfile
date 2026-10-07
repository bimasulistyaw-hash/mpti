# Frontend Development Dockerfile (React / Vue Vite)
FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install || true

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
