const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// lectures 40-47
passport.serializeUser((user, done) => {
  // different id then googleID
  // mongo generates a unique id for each record in a collection
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    // area to save a user to our database if it is a first time user
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        // user already exists
        return done(null, existingUser);
      }
      // user does not exist - create new user
      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);
