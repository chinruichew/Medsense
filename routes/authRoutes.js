const passport = require('passport');

module.exports = app => {
    /* Start of Local Auth */
    app.get(
        '/auth/local',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );
    /* End of Local Auth */
};