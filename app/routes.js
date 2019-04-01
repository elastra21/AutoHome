// app/routes.js
module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    res.render("index.html"); // load the index.ejs file
  });

  app.get("/message", function(req, res) {
    res.render("message.html");
  });

  app.post("/login", function(req, res, next) {
    passport.authenticate("local-login", function(err, user, info) {
      if (!user) {
        return res.json({ result: 1 });
      } else {
        return res.json({ user: user });
      }
    })(req, res, next);
  });

  // process the signup form
  app.post("/signup", function(req, res, next) {
    passport.authenticate("local-signup", function(err, user, info) {
      if (!user) {
        return res.json({ result: 2 });
      } else {
        return res.json({ user: user });
      }
    })(req, res, next);
  });

  app.use(function(req, res, next) {
    res.status(404).send("Sorry cant find that!");
  });
};
//esto si está bien
