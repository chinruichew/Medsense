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

const keys = require('./config/keys');
require('./models/User');

const app = express();

/* Start of Console Log configuration */
const log = console.log;
console.log = function(){
    log.call(console, 'Logging -> [' + new Date().toString() + ']');
    log.apply(console, arguments);
};
/* End of Console Log configuration */

/* Start of MongoDB Connection */
const aws = require('aws-sdk');
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

        mongoose.connect(keys.mongoURI);

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
/* End of MongoDB Connection */

/* Start of Middleware configuration */
const router = express.Router();
router.use(function (req, res, next) {
    next();
});
app.use(router);
app.use(helmet());

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
const sessionConfig = {
    secret: keys.cookieKeySecret,
    cookie: {
        maxAge: 1000 * 60 * 30,
        keys: [keys.cookieKey]
    },
    resave: true,
    saveUninitialized: true,
    httpOnly: false
};
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    sessionConfig.cookie.secure = true;
}
app.use(cookieSession(sessionConfig));
/* End of Session Configurations */

app.use(flash());

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false;
    }

    return compression.filter(req, res);
}
app.use(compression({filter: shouldCompress}));

const csurfProtection = csurf({ cookie: true });

const Merror = MerrorModule.Merror;
const MerrorMiddleware = MerrorModule.MerrorMiddleware;
app.use(MerrorMiddleware());

function errorNotification (err, str, req) {
    const title = 'Error in ' + req.method + ' ' + req.url;

    notifier.notify({
        title: title,
        message: str
    })
}
if (process.env.NODE_ENV !== 'production') {
    app.use(errorhandler({log: errorNotification}))
}

// CORS Requests Configurations
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
/* End of Middleware configuration */

/* Start of Slug URL String configuration */
slug.defaults.mode ='pretty';
slug.defaults.modes['rfc3986'] = {
    replacement: '-',      // replace spaces with replacement
    symbols: true,         // replace unicode symbols or not
    remove: null,          // (optional) regex to remove characters
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multi-characters
};
slug.defaults.modes['pretty'] = {
    replacement: '-',
    symbols: true,
    remove: /[.]/g,
    lower: false,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap
};
/* End of Slug URL String configuration */

/* Start of REST API Configurations */
require('./routes/authRoutes')(app);
require('./routes/caseRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/s3Routes')(app);
require('./routes/adminRoutes')(app);
require('./routes/gameRoutes')(app);
require('./routes/utilityRoutes')(app);
require('./routes/nlpRoutes')(app);
/* End of REST API Configurations */

/* Start of GraphQL Configurations */
app.use('/graphiql', apolloServerExpress.graphiqlExpress({
    endpointURL: "/graphql"
}));
/* End of GraphQL Configurations */

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

getParams = {
    Bucket: keys.httpsBucket,
    Key: keys.httpsPrivateKey
};

s3.getObject(getParams, function (err, data) {
    if (err)
        console.log(err);

    const privateKey = data.Body.toString('utf-8');

    const getParams = {
        Bucket: keys.httpsBucket,
        Key: keys.httpsCertificate
    };

    s3.getObject(getParams, function (err, data) {
        if (err)
            console.log(err);

        const certificate = data.Body.toString('utf-8');

        const credentials = {
            key: privateKey,
            cert: certificate
        };

        // const server = https.createServer(credentials, app);
        // server.on('error', (e) => {
        //     console.error(e);
        // });
        // server.listen(PORT, function () {
        //     console.log(chalk.green.underline.bold('Server running at http://127.0.0.1:' + PORT + '/'));
        // });
        const server = app.listen(PORT, function () {
            console.log(chalk.green.underline.bold('Server running at http://127.0.0.1:' + PORT + '/'));
        });
    });
});