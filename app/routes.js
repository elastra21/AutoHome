// app/routes.js
module.exports = function(app, passport) {
    app.post('/login', function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
        return res.json({"user": user});
    })(req, res, next);
    });

    // process the signup form
    app.post('/signup', function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) {
        return res.json({"user": user});
    })(req, res, next);
    });
};
 