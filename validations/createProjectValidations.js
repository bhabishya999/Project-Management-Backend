const { check, validationResult } = require("express-validator");
const projectModel = require("../model/projects");

const createProjectValidationFields = [
    check('title', "The title is required")
        .notEmpty()
        .custom(async (value) => await titleExistsValidation(value)),

    check('description', "The description field is required")
        .notEmpty(),

    check('featured', "The featured field is required and must be a boolean")
        .notEmpty()
        .isBoolean().withMessage("The featured field must be a boolean")
        .toBoolean(),

    check('type', "The project type field is required")
        .notEmpty(),

    check('city', "The city field is required")
        .notEmpty(),

    check('category', "The category field is required")
        .notEmpty()
];

async function titleExistsValidation(value) {
    const titleExists = await projectModel.findOne({ title: value });
    if (titleExists) {
        throw new Error('The project title should be unique');
    }
    return true;
}

const validateProject = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createProjectValidationFields,
    validateProject
};
