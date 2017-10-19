const passport = require('passport');

module.exports = app => {
    /* Start of Local Auth */
    app.get(
        '/auth/local', (req, res) =>
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );
    /* End of Local Auth */

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};