const keyManagement = require('../utility/keyManagement');

module.exports = {
    cookieKey: keyManagement.decryptKey(process.env.COOKIE_KEY),
    mongoHost: keyManagement.decryptKey(process.env.MONGO_HOST),
    awsAccessKeyId: keyManagement.decryptKey(process.env.AWS_ACCESS_KEY_ID),
    awsSecretKey: keyManagement.decryptKey(process.env.AWS_SECRET_KEY),
    mongoURI: keyManagement.decryptKey(process.env.MONGO_URI),
    mongoStagingURI: keyManagement.decryptKey(process.env.MONGO_STAGING_URI),
    mongoUser: keyManagement.decryptKey(process.env.MONGO_USER),
    mongoPort: keyManagement.decryptKey(process.env.MONGO_PORT),
    dstPort: keyManagement.decryptKey(process.env.DST_PORT),
    localPort: keyManagement.decryptKey(process.env.LOCAL_PORT),
    mongoConnectBucket: keyManagement.decryptKey(process.env.MONGO_CONNECT_BUCKET),
    mongoConnectKey: keyManagement.decryptKey(process.env.MONGO_CONNECT_KEY),
    cookieKeySecret: keyManagement.decryptKey(process.env.COOKIE_KEY_SECRET),
    httpsBucket: keyManagement.decryptKey(process.env.HTTPS_BUCKET),
    httpsPrivateKey: keyManagement.decryptKey(process.env.HTTPS_PRIVATE_KEY),
    httpsCertificate: keyManagement.decryptKey(process.env.HTTPS_CERTIFICATE),
    medsenseEmailUsername: keyManagement.decryptKey(process.env.MEDSENSE_EMAIL_USERNAME),
    medsenseEmailPassword: keyManagement.decryptKey(process.env.MEDSENSE_EMAIL_PASSWORD),
    medsenseTeamEmail: keyManagement.decryptKey(process.env.MEDSENSE_TEAM_EMAIL)
};