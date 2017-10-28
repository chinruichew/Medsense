const passport = require('passport');

module.exports = app => {
    /* Start of Local Auth */
    app.get(
        '/auth/local',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash : true
        })
    );

    app.get('/auth/local/signup', passport.authenticate('local-signup', {
        successRedirect : '/login',
        failureRedirect : '/signup',
        failureFlash : true,
        session: false
    }));
    /* End of Local Auth */
};