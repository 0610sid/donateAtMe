const Joi = require('joi');

module.exports.ngoschema = Joi.object({
    ngo: Joi.object({
        name: Joi.string().required(),
        pincode: Joi.number().required(),
        address: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        housing: Joi.string().required(),
        num: Joi.number().required(),
        email: Joi.string().required()
    }).required()
});