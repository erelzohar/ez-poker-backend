const jwt = require("jsonwebtoken"); 

function getNewToken(payload) { // (payload will be the user object)
    return jwt.sign({ payload }, config.jwtKey, { expiresIn: "24h" });
}

module.exports = {
    getNewToken
};