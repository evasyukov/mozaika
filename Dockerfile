FROM node:20 AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# backend
FROM node:20

WORKDIR /app

COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

COPY backend ./ 

COPY --from=frontend-build /app/frontend/dist ../frontend/dist

WORKDIR /app/backend

EXPOSE 5007

CMD ["node", "app.js"]