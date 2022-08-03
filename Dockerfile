# Base image
FROM node AS febuild

WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && npm install --force && npm run build

FROM node AS bebuild
WORKDIR /root/
COPY --from=febuild /usr/src/app/frontend/build ./frontend/build
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend/ ./backend/

EXPOSE 8000

CMD ["node", "./backend/index.js"]