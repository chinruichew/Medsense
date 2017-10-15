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

// Local Strategy
passport.use(
    new LocalStrategy({}, async(username, password, done) => {
        const existingUser = await User.findOne({ username });

        if (!existingUser || existingUser.password !== password) {
            return done(null, false, { message: 'Invalid Username or Password!' });
        }

        return done(null, existingUser);
    })
);