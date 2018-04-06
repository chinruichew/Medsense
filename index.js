const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const tunnel = require('tunnel-ssh');
const compression = require('compression');
const slug = require('slug');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const helmet = require('helmet');
const csurf = require('csurf');
const GPU = require('gpu.js');
const apolloServerExpress = require('apollo-server-express');
const session = require('express-session');
const connect = require("connect");
const errorhandler = require('errorhandler');
const notifier = require('node-notifier');
const MerrorModule = require('express-merror');
const cors = require("cors");
const cluster = require("cluster");
const https = require('https');
const fs = require('fs-extra');
const aws = require('aws-sdk');

const keys = require('./config/keys');
require('./models/User');

const app = express();

/* Start of MongoDB Connection */
aws.config.update({
    accessKeyId: keys.awsAccessKeyId,
    secretAccessKey: keys.awsSecretKey
});
const s3 = new aws.S3();
let getParams = {
    Bucket: keys.mongoConnectBucket,
    Key: keys.mongoConnectKey
};

s3.getObject(getParams, function (err, data) {
    if (err)
        return err;

    const credentialData = data.Body.toString('utf-8');

    const config = {
        username: keys.mongoUser,
        host: keys.mongoHost,
        port: keys.mongoPort,
        dstPort: keys.dstPort,
        localPort: keys.localPort,
        privateKey: credentialData
    };
    tunnel(config, function (error, server) {

        if (error) {
            chalkAnimation.rainbow("SSH connection error: " + error);
        }

        mongoose.connect(keys.mongoStagingURI);

        mongoose.Promise = global.Promise;
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'DB connection error:'));
        db.once('open', function () {
            chalkAnimation.rainbow("DB connection successful!");
            setTimeout(() => {
                console.log(chalk.green.underline.bold('Initializing...'));
            }, 100);
        });

    });
});

/* Start of Middleware configuration */
const router = express.Router();
router.use(function (req, res, next) {
    next();
});
app.use(router);

/* Start of Morgan Logger Configurations */
morgan.token('date', function() {
    const p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
    return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5] );
});
app.use(morgan('combined'));
/* End of Morgan Logger Configurations */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Start of Session Configurations */
app.set('trust proxy', 1);
const sessionConfig = {
    name: 'session',
    keys: [keys.cookieKey],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: false
};
app.use(cookieSession(sessionConfig));
/* End of Session Configurations */

/* Start of REST API Configurations */
require('./routes/authRoutes')(app);
require('./routes/caseRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/s3Routes')(app);
require('./routes/adminRoutes')(app);
require('./routes/gameRoutes')(app);
require('./routes/utilityRoutes')(app);
require('./routes/nlpRoutes')(app);
require('./routes/approachSpecialityRoutes')(app);
require('./routes/analyticsRoutes')(app);
require('./routes/recommendationRoutes')(app);
/* End of REST API Configurations */

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
console.log(chalk.blue.underline.bold('Listening to PORT:', PORT));
app.listen(PORT);