var mongoose = require('mongoose');
var User = require('../models/User');

module.exports = app => {
    app.post('/api/signup', function (req, res) {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (err) { return res.send(err) }
            if (user) {
                return res.status(409).send({ data: null, message: "user exists" });
            }
            if (!user) {
                var newUser = new User();
                newUser.username = req.body.username;
                newUser.password = req.body.password;
                newUser.school = req.body.school;
                newUser.year = req.body.year;
                newUser.profilepicture = req.body.profilepicture;
                newUser.usertype = req.body.usertype;
                newUser.speciality = req.body.speciality;

                const jsonObjectSS = JSON.parse(req.body.subspeciality);
                for (const prop in jsonObjectSS) {
                    newUser.subspeciality.push(jsonObjectSS[prop])
                }

                newUser.save();
                return res.status(201).send({ data: user, message: "user created" });
            }
        });
    })

    app.post('/api/updateStudent', function (req, res) {
        User.findById(req.body.id, function (err, user) {
            if (err) { return res.send(err) }
            if (user) {
                user.year = req.body.year;
                user.school = req.body.school;
                user.save();
            }
        });
    })

    app.post('/api/updateProfessor', function (req, res) {
        User.update({ _id: req.body.id }, { $set: { subspeciality: [] } }, function (err, response) { });
        User.findById(req.body.id, function (err, user) {
            if (err) { return res.send(err) }
            if (user) {
                user.school = req.body.school;
                user.speciality = req.body.speciality;
                const jsonObjectSS = JSON.parse(req.body.subspeciality);
                for (const prop in jsonObjectSS) {
                    user.subspeciality.push(jsonObjectSS[prop]);
                }
                user.save();
            }
        });
        return res.status(201).send({ data: null, message: "updated" });
    })
};