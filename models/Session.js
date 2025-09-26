const sequelize = require("../config/db");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const store = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "supersecret",
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set true if HTTPS
    maxAge: 24 * 60 * 60 * 1000,
  },
});

store.sync();

module.exports = sessionMiddleware;
