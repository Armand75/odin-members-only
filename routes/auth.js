const express = require("express");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();


passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
})


passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({ where: {username} });

        if(!user){
            return done(null, false, { message: 'Incorrect username.'});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user);

    }
))

router.get("/signup", (req,res) => {
    res.render("signup");
})


router.post("/signup", async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    password,
    confirmPassword,
    is_admin,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Password do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    first_name,
    last_name,
    username,
    password: hashedPassword,
    is_admin: is_admin ? true : false,
  });

  await newUser.save();
  res.redirect('/login');

});

router.get("/login", (req,res) => {
    res.render("login");
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/login'
}))

router.post('/join', async (req, res) => {
    const { passcode } = req.body;
    const correctPasscode = "I am a member"; 

    if (passcode === correctPasscode) {
        // Assuming user is logged in and we have their ID
        const userId = req.user.id; // Get this from session
        await User.update( { membership_status: true }, { where: { id: userId }});
        res.send("Membership granted!");
    } else {
        res.status(400).send("Incorrect passcode.");
    }
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
    
        req.session.destroy((err) => {
          if (err) return next(err);
    
          res.clearCookie('connect.sid'); // clear cookie
          res.redirect('/login');
        });
      });
});




module.exports = router;
