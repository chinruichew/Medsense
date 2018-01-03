const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/login', (req, res) => {
        const values = req.body;
        User.findOne({ username: values.username }, function (err, user) {
            if (user) {
                req.session.user = user;
                console.log(req.session);
                res.send('Authenticated');
            } else {
                res.send('Invalid Username/Password!');
            }
        });
    });

    app.get('/api/logout', (req, res) => {
        req.session.user = '';
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.session.user);
    });
};