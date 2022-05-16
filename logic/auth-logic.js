const dal = require("../data-access/dal");
const cryptoHelper = require("../helpers/crypto-helper.js");
const jwtHelper = require("../helpers/jwt-helper");

async function registerAsync(player) {

    player.password = cryptoHelper.hash(player.password);

    const sql = "INSERT INTO players VALUES( ?, ?, ?, ?, ?, ?)";
    await dal.executeAsync(sql, [player.playerName, player.profileImageName, player.chipsCount, player.email, player.password, player.uuid]);

    delete player.password;

    player.token = jwtHelper.getNewToken(player);

    return player;
}

async function loginAsync(credentials) {

    credentials.password = cryptoHelper.hash(credentials.password);

    const sql = `SELECT uuid, playerName, chipsCount , email , profileImageName FROM players WHERE email = ? AND password = ?`;
    const players = await dal.executeAsync(sql, [credentials.email, credentials.password]);
    if (players.length === 0) return null;
    const player = players[0];

    // Generate new token:
    player.token = jwtHelper.getNewToken(player);

    return player;
}

module.exports = {
    registerAsync,
    loginAsync
};