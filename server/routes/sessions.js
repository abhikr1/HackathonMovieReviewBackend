const express = require('express');
const router = express.Router();
const UserCredential = require('../models/user-credential');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Email and Password not present in request"});
        return;
    }
    console.log(req.body);
    const { email, password } = req.body;

    if (!email) {
        res.status(400).send({message: "Email not present in request"});
        return;
    }

    if (!password) {
        res.status(400).send({message: "Password not present in request"});
        return;
    }

    UserCredential.findOne({ email }).then(user => {
        if (!user) {
            res.status(400).send({message: "User not signed up"});
            return;
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            res.status(400).send({message: "Incorrect email or password"});
            return;
        }

        req.session.userId = user.id;
        console.log(req.session.userId);

        res.status(201).send({message : "Login Successful"});
    }).catch(() => {
        res.status(500).send({ message: "Internal Server Error" });
    });
});

router.delete('/me', (req, res) => {
    delete req.c.userId;
    res.status(204).send();
});

module.exports = router;