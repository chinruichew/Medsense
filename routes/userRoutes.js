const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/signup', function (req, res) {
        const values = req.body.values;
        User.findOne({ username: req.body.username }, function (err, user) {
            if (!user) {
                const newUser = new User();
                newUser.username = values.username;
                newUser.password = newUser.generateHash(values.password);
                newUser.usertype = "student";
                newUser.school = values.school;
                newUser.year = values.year;
                newUser.save();
            }
        });
    });

    app.post('/api/updateStudent', function (req, res) {
        User.findById(req.body.values.id, function (err, user) {
            if (err) { return res.send(err) }
            if (user) {
                user.year = req.body.values.year;
                user.school = req.body.values.school;
                user.save();
            }
        });
    });

    app.post('/api/updateProfessor', function (req, res) {
        // User.update({ _id: req.body.values.id }, { $set: { subspeciality: [] } }, function (err, response) { });
        User.findById(req.body.values.id, function (err, user) {
            // console.log(req.body.values)
            if (err) { return res.send(err) }
            if (user) {
                user.school = req.body.values.school;
                user.speciality = req.body.values.speciality;
                user.subspeciality = req.body.values.subspeciality;
                // const jsonObjectSS = JSON.parse(req.body.subspeciality);
                // for (const prop in jsonObjectSS) {
                //     user.subspeciality.push(jsonObjectSS[prop]);
                // }
                user.save();
            }
        });
        return res.status(201).send({ data: null, message: "updated" });
    })
};