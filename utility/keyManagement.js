const CryptoJS = require("crypto-js");

const constants = require('./constantTypes');

module.exports = {
    encryptKey: function(plainText) {
        return CryptoJS.AES.encrypt(plainText, constants.SECRET);
    },
    decryptKey: function(cipherText) {
        return CryptoJS.AES.decrypt(cipherText.toString(), constants.SECRET).toString(CryptoJS.enc.Utf8);
    }
};