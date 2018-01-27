const constants = require('../utility/constantTypes');

module.exports = app => {
    app.get('/api/getConstantTypes', function(req, res) {
        res.send(constants);
    });
};