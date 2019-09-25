const passport = require("passport");

// good explanation of how this stuff is actually getting called in lecture 47

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // different scopes/permissions within google oauth -- there are a lot more that can
      // be accessed
      scope: ["profile", "email"]
    })
  );

  // passport sees the "code" inside the URL and will handle the request for us
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    // after authentication send user to surveys display page
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    // send back 'undefined'/'null' because the user's session should be killed
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
