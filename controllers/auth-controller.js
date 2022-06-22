const express = require("express");
const uuid = require("uuid");
const authLogic = require("../logic/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const UserModel = require("../models/UserModel");
const router = express.Router();

//http://localhost:3001/api/auth/register // POST
router.post("/register", async (req, res) => {
    try {
        const userToAdd = new UserModel(req.body);

        userToAdd.chipsCount = 0;
        userToAdd.uuid = uuid.v4();
        userToAdd.email = userToAdd.email.toLowerCase();

        const joiErrors = userToAdd.validateRegister();
        if (joiErrors) return res.status(422).send(joiErrors);

        const addedUser = await authLogic.registerAsync(userToAdd);
        res.status(201).json(addedUser);
    }
    catch (err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

//http://localhost:3001/api/auth/login // POST
router.post("/login", async (req, res) => {
    try {
        const loggedInUser = await authLogic.loginAsync(req.body);
        if (!loggedInUser) {
            res.status(401).json("Incorrect email or password");
            return;
        }
        res.json(loggedInUser);
    }
    catch (err) {
        res.status(500).send(errorsHelper.getError(err.message));
    }
});

module.exports = router;