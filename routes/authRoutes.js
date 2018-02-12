const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/login', (req, res) => {
        const values = req.body;
        User.findOne({ username: values.username }, function (err, user) {
            if (user !== null && user.validPassword(values.password)) {
                User.findByIdAndUpdate(user._id, { $set: { previousLogin: user.currentLogin, currentLogin: new Date(), loginCount: user.loginCount+1 }}, { new: true }, function(err, user) {
                    req.session.user = user;
                    res.send('Authenticated');
                });
            } else {
                res.send('Invalid Username/Password!');
            }
        });
    });

    app.get('/api/updateSessionUser', (req, res) => {
        User.findOne({ username: req.session.user.username }, function (err, user) {
            if (user) {
                req.session.user = user;
                res.send('Authenticated');
            }
        });
    });

    app.get('/api/logout', function(req, res) {
        req.session.user = false;
        res.clearCookie("AWSELB");
        res.clearCookie("express:sess");
        res.clearCookie("express:sess.sig");
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        if(req.session.user !== undefined) {
            User.findByIdAndUpdate(req.session.user._id, { $set: { currentLogin: new Date() }}, { new: true }, function(err, user) {
                res.send(req.session.user);
            });
        } else {
            res.send(req.session.user);
        }
    });
};