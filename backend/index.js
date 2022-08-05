const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const { sessionStore } = require('./connectors/mongoose');
const handleErrors = require('./middleware/handleErrors');
const port = 8000;
const { ENVIRONMENT, SESSIONSECRET } = process.env;

const characterRoutes = require('./routes/characters');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const packRoutes = require('./routes/packs');
const dialogRoutes = require('./routes/dialogs');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: SESSIONSECRET,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: oneDay },
  resave: false,
}));

app.use('/api/characters', characterRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/dialogs', dialogRoutes);

app.use(handleErrors);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

if (ENVIRONMENT !== 'DEV') {
  app.use(express.static(path.join('/root/frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join("/root/frontend/build", "index.html"));
  })
}