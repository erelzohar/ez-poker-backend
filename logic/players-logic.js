const dal = require("../data-access/dal");

async function getAllPlayersAsync() {
    const sql = "SELECT * FROM players";
    const players = await dal.executeAsync(sql);
    return players;
}



module.exports = {
    getAllPlayersAsync
}