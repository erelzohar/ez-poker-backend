const express = require("express");
const playersLogic = require("../logic/players-logic");
const router = express.Router();

// POST http://localhost:3001/api/players
router.get("/", async (request, response) => {
    try {
        const players = await playersLogic.getAllPlayersAsync();
        response.json(players);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/", async (request, response) => {
    try {
        const players = await playersLogic.getAllPlayersAsync();
        response.json(players);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;
