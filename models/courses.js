const Joi = require('joi');


function validateCourses(data) {
    const schema = Joi.object({
        semester: Joi.string().allow(''),
		subject: Joi.string().required(),
		requiresLab: Joi.boolean().required(),
		credits: Joi.number().min(0).required()
    });

    return schema.validate(data);
}


exports.validateCourses = validateCourses;
