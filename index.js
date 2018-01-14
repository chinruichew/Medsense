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
    Bucket: 'medsense-credentials', // your bucket name,
    Key: 'id_rsa' // path to the object you're looking for
};
s3.getObject(getParams, function(err, data) {
    // Handle any error and exit
    if (err)
        return err;

    const credentialData = data.Body.toString('utf-8'); // Use the encoding necessary

    const config = {
        username:'ec2-user',
        host: keys.mongoURI,
        port: 22,
        dstPort:27017,
        localPort: 2000,
        privateKey: credentialData
    };
    tunnel(config, function (error, server) {

        if(error){
            console.log(chalk.red.underline.bold("SSH connection error: " + error));
        }

        mongoose.connect('mongodb://127.0.0.1:2000/Medsense');

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'DB connection error:'));
        db.once('open', function() {
            chalkAnimation.rainbow("DB connection successful!");
            setTimeout(() => {
                console.log(chalk.green.underline.bold('Initializing...'));
            }, 500);
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

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(flash());

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false;
    }

    return compression.filter(req, res);
}
app.use(compression({filter: shouldCompress}));
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

require('./routes/authRoutes')(app);
require('./routes/caseRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/s3Routes')(app);
require('./routes/adminRoutes')(app);
require('./routes/gameRoutes')(app);

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
