const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Local Strategy Login
passport.use(
    new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, async(req, email, password, done) => {
        console.log(email, password);
        const existingUser = await User.findOne({ email: email });

        if (!existingUser || existingUser.password !== password) {
            return done(null, false, { message: 'Invalid Username or Password!' });
        }

        return done(null, existingUser);
    })
);