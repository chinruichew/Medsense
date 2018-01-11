const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const bodyParser = require('body-parser');
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

    // No error happened
    // Convert Body from a Buffer to a String

    const credentialData = data.Body.toString('utf-8'); // Use the encoding necessary

    const config = {
        username:'ec2-user',
        host: keys.mongoURI,
        port: 22,
        dstPort:27017,
        localPort: 2000,
        privateKey: credentialData
    };
    const tunnel = require('tunnel-ssh');
    const server = tunnel(config, function (error, server) {

        if(error){
            console.log("SSH connection error: " + error);
        }

        mongoose.connect('mongodb://127.0.0.1:2000/Medsense');

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'DB connection error:'));
        db.once('open', function() {
            console.log("DB connection successful");
        });

    });
});

/* End of MongoDB Connection */

const router = express.Router();
router.use(function (req, res, next) {
    next();
});

app.use('/api', router);

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
app.use(flash());
/* End of Middleware configuration */

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
app.listen(PORT);
