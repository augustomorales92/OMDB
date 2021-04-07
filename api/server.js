const express = require("express");
const helmet = require("helmet");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const sequelize = require('../db');

FacebookStrategy = require('passport-facebook').Strategy;








app.use(helmet());

// Express Route File Requires
const authAPI = require("./routes/index");

app.use(express.static(path.resolve(__dirname, "../public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: "bootcamp" }));

app.use(passport.initialize());
app.use(passport.session());




/* passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
)); */



passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: `password`,
    },
    function (email, password, done) {
      User.findOne({ where: { email } }).then((user, err) => {
        if (err) return done(err);

        if (!user) return done(null, false, { message: "Incorrect username." });

        return user.hash(password, user.salt).then((hashedPass) => {
          if (hashedPass !== user.password)
            return done(null, false, { message: "Incorrect password." });

          return done(null, user);
        });
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// How we look for the user
passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then(user => done(null, user))
});

// Express Routing
app.use("/api", authAPI);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

sequelize.sync({})
  .then(() => {
    http.createServer(app).listen(3001, () => {
      console.log(`Server listening at port 3001`);
    });
  })
  

