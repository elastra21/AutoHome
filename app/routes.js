// app/routes.js
module.exports = function(app, passport) {




    app.post('/login', function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
        if (!user) { return res.json({"result":false}); }
        return res.json({"result":true});
    })(req, res, next);
    });

    // process the signup form
    app.post('/signup', function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) {
        if (!user) { return res.json({"result":false}); }
        return res.json({"result":true});
    })(req, res, next);
    });
};
 