const Joi = require("joi");

class PlayerModel {
    constructor(player) {
        this.uuid = player.uuid;
        this.playerName = player.playerName;
        this.chipsCount = player.chipsCount;
        this.email = player.email;
        this.password = player.password;
        this.profileImageName = player.profileImageName;
    }

    static #registerValidationSchema = Joi.object({
        uuid: Joi.string().required(),
        playerName: Joi.string().required().min(2),
        email: Joi.string().required().email().lowercase(),
        password: Joi.string().required().min(6),
        chipsCount: Joi.number().required().min(0).max(1),
        profileImageName: Joi.string().required()
    });

    static #loginValidationSchema = Joi.object({
        email: Joi.string().required().email().lowercase(),
        password: Joi.string().required().min(6),
    });

    validateRegister() {
        const result = PlayerModel.#registerValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; // null = no errors.
    }

    validateLogin() {
        const result = PlayerModel.#loginValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null;
    }

}

module.exports = PlayerModel;