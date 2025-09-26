const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const db = require("./config/db"); // Database configuration
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const sessionMiddleware = require("./models/Session");

const User = require("./models/user");

const { isAuthenticated } = require("./middleware/auth");


const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// app.use(async (req, res, next) => {
//     if(req.session.userId){
//         req.user = await User.findByPk(req.session.userId)
//     }else{
//         req.user = null;
//     }
//     next();
// })

app.set("view engine", "ejs");

// Routes
app.use("/", authRoutes);
app.use("/messages", isAuthenticated, messageRoutes);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
