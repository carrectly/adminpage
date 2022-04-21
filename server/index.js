require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 443;
const app = express();
const socketio = require('socket.io');
const https = require('https');
const http = require('http');
const fs = require('fs');

const keyPass = process.env.HTTPS_KEY;
const certificate = process.env.HTTPS_CERTIFICATE;

const key = fs.readFileSync(require.resolve(keyPass), {
  encoding: 'utf8',
});
const cert = fs.readFileSync(require.resolve(certificate), {
  encoding: 'utf8',
});

module.exports = app;

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  // auth and api routes
  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));
  app.use('/square', require('./square'));

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
  });

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    if (err.errors) {
      res.status(err.statusCode).send(err.errors);
    } else {
      res.status(err.status || 500).send(err.message || 'Internal server error.');
    }
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)

  let server;
  if (process.env.NODE_ENV === 'production') {
    server = http.createServer().listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } else {
    server = https
      .createServer({ key, cert }, app)
      .listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  }

  const io = socketio(server);
  require('./socket')(io);
};

const syncDb = () => db.sync();

async function bootApp() {
  try {
    await sessionStore.sync();
    await syncDb();
    await createApp();
    await startListening();
  } catch (err) {
    console.log(err);
  }
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}
