const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();

const DBURI = 'mongodb://localhost/Medsense';
// Connect to MLab
mongoose.Promise = global.Promise;
mongoose.connect(DBURI).then(() =>  console.log('connection succesful')).catch((err) => console.error(err));
require('app-module-path').addPath(require('path').join(__dirname, '/routes'));
const router = express.Router();
router.use(function (req, res, next) {
    next();
});
const signupRoute = require('signup');
app.use('/api', router);
app.use('/signup', signupRoute

/* Start of Middleware configuration */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
/* End of Middleware configuration */

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
