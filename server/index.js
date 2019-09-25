const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

// make sure the mongoDB user collection code is executed
require("./models/User");

// since there is no export statement in the passport file
// importing it just runs the code in that file
require("./services/passport");

const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");

// connect to our MongoDB
mongoose.connect(keys.mongoURI);

// good explanation of how this stuff is actually getting called in lecture 47

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    // how long cookie lasts (30 days)
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === "production") {
  // Serve production assets
  app.use(express.static("client/build"));

  // must be react-router route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// http://localhost:5000/auth/google/callback
