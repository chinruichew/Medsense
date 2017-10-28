const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const app = express();

/* Start of MongoDB Connection */
const config = {
    "USER"    : "",
    "PASS"    : "",
    "HOST"    : "ec2-54-169-186-57.ap-southeast-1.compute.amazonaws.com",
    "PORT"    : "27017",
    "DATABASE" : "medsenseDB"
};
const dbPath  = "mongodb://"+config.USER + ":"+
    config.PASS + "@"+
    config.HOST + ":"+
    config.PORT + "/"+
    config.DATABASE;

const db = mongoose.connect(dbPath);
/* End of MongoDB Connection */

require('app-module-path').addPath(require('path').join(__dirname, '/routes'));
const router = express.Router();
router.use(function (req, res, next) {
    next();
});
const signupRoute = require('signup');
const uploadRoute = require('upload');
app.use('/api', router);
app.use('/signup', signupRoute);
app.use('/upload', uploadRoute);

/* Start of Middleware configuration */
app.use(morgan('dev'));
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
app.use(flash());
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
