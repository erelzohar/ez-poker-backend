const Joi = require("joi");

class UserModel {
    constructor(user) {
        this.uuid = user.uuid;
        this.userName = user.userName;
        this.chipsCount = user.chipsCount;
        this.email = user.email;
        this.password = user.password;
        this.profileImageName = user.profileImageName;
    }

    static #registerValidationSchema = Joi.object({
        uuid: Joi.string().required(),
        userName: Joi.string().required().min(2),
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
        const result = UserModel.#registerValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; // null = no errors.
    }

    validateLogin() {
        const result = UserModel.#loginValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null;
    }

}

module.exports = UserModel;