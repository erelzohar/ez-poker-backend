const dal = require("../data-access/dal");
const cryptoHelper = require("../helpers/crypto-helper.js");
const jwtHelper = require("../helpers/jwt-helper");

async function registerAsync(user) {

    user.password = cryptoHelper.hash(user.password);

    const sql = "INSERT INTO users VALUES( ?, ?, ?, ?, ?, ?)";
    await dal.executeAsync(sql, [user.userName, user.profileImageName, user.chipsCount, user.email, user.password, user.uuid]);

    delete user.password;

    user.token = jwtHelper.getNewToken(user);

    return user;
}

async function loginAsync(credentials) {

    credentials.password = cryptoHelper.hash(credentials.password);

    const sql = `SELECT uuid, userName, chipsCount , email , profileImageName FROM users WHERE email = ? AND password = ?`;
    const users = await dal.executeAsync(sql, [credentials.email, credentials.password]);
    if (users.length === 0) return null;
    const user = users[0];

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);
    delete user.password;
    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};