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

const keys = require('./config/keys');
require('./models/User');

const app = express();

/* Start of MongoDB Connection */
const aws = require('aws-sdk');
aws.config.update({
    accessKeyId: keys.awsAccessKeyId,
    secretAccessKey: keys.awsSecretKey
});
const s3 = new aws.S3();
const getParams = {
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

        mongoose.connect(keys.mongoURI, {
            useMongoClient: true
        });

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
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const sessionConfig = {
    secret: 'Medsense Nyan cat',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        keys: [keys.cookieKey]
    },
    resave: true,
    saveUninitialized: true
};
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    sessionConfig.cookie.secure = true;
}
app.use(session(sessionConfig));
app.use(flash());

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false;
    }

    return compression.filter(req, res);
}
app.use(compression({filter: shouldCompress}));

const csurfProtection = csurf({ cookie: true });
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

app.listen(PORT);