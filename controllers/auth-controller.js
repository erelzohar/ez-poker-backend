const express = require("express");
const uuid = require("uuid");
const authLogic = require("../logic/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const PlayerModel = require("../models/PlayerModel");
const router = express.Router();

//http://localhost:3001/api/auth/register // POST
router.post("/register", async (request, response) => {
    try {
        const playerToAdd = new PlayerModel(request.body);

        playerToAdd.chipsCount = 0;
        playerToAdd.uuid = uuid.v4();
        playerToAdd.email = playerToAdd.email.toLowerCase();
        
        const joiErrors = playerToAdd.validateRegister();
        if (joiErrors) return response.status(422).send(joiErrors);

        const addedPlayer = await authLogic.registerAsync(playerToAdd);
        response.status(201).json(addedPlayer);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

//http://localhost:3001/api/auth/login // POST
router.post("/login", async (request, response) => {
    try {
        const loggedInPlayer = await authLogic.loginAsync(request.body);
        if (!loggedInPlayer) return response.status(401).send("Incorrect email or password.");
        response.json(loggedInPlayer);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;