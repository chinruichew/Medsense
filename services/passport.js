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
        passReqToCallback : true
    }, async(req, username, password, done) => {
        const existingUser = await User.findOne({ username: username });

        if (!existingUser || existingUser.password !== password) {
            return done(null, false, { message: 'Invalid Username or Password!' });
        }

        return done(null, existingUser);
    })
);

// Local Strategy Sign Up
passport.use('local-signup', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, username, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if there is already a user with that email
            if (user) {
                return done(null, false, { message: 'Username has already been used!' });
            } else {

                // if there is no user with that email
                // create the user
                let newUser = new User({
                    username: username,
                    password: password
                }).save();

                return done(null, newUser);
            }
        });
    });
}));