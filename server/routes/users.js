const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credential');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


router.post('/', (req, res) => {

    if (!req.body) {
        res.status(400).send({message: "Email and Password not present in request"});
        return;
    }

    const { email, password, firstName, lastName } = req.body;
    console.log(req.body);
    if (!email) {
        res.status(400).send({message: "Email not present in request"});
        return;
    }

    if (!password) {
        res.status(400).send({message: "Password not present in request"});
        return;
    }



    UserCredential.findOne({ email }).then(user => {
        if (user) {
            console.log("Hello");
            res.status(404).send({message: "User already signed up"});
            return;
        }
        const hash = bcrypt.hashSync(password);

        const userCredential = new UserCredential({ email, password: hash });
        userCredential.save().then(() => {
            const user = new User({ _id: userCredential.id, email, firstName : firstName, lastName : lastName });
            user.save().then(() => {
                
                res.status(201).send({ id: userCredential.id, message : "Successfully Created" });
            });
        });
    }).catch(() => {
        res.status(500).send({ message: "Internal Server Error" });
    });
});

router.get('/me', auth.authenticate, (req, res) => {
    User.findOne({ _id: req.session.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ message: "Internal Server Error" });
    });
});

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ message: "Internal Server Error" });
    });
});

router.put('/me', auth.authenticate, (req, res) => {
    if (!req.session.userId) {
        res.send(401).send({ message: "Not logged in"});
    }

    const { firstName, lastName } = req.body;

    const updateQuery = {};
    (firstName !== undefined) && (updateQuery.firstName = firstName);
    (lastName !== undefined) && (updateQuery.lastName = lastName);

    User.updateOne({ _id: req.session.userId }, updateQuery).then(() => {
        res.status(204).send.json({message : "Successfully created"});
    }).catch(() => {
        res.status(500).send.json({ message: "Internal Server Error" });
    });
});



module.exports = router;