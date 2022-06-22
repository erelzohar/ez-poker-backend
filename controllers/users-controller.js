const express = require("express");
const usersLogic = require("../logic/users-logic");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await usersLogic.getAllUsersAsync();
        res.json(users);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;
