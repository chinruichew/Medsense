const CryptoJS = require("crypto-js");

const SECRET = 'FYP Zenith';

module.exports = {
    encryptKey: function(plainText) {
        return CryptoJS.AES.encrypt(plainText, SECRET);
    },
    decryptKey: function(cipherText) {
        return CryptoJS.AES.decrypt(cipherText.toString(), SECRET).toString(CryptoJS.enc.Utf8);
    }
};