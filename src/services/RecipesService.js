require('../models/Recipe');
const mongoose = require('mongoose');
const {HandledHttpError} = require('../helpers/error');
const Recipe = mongoose.model('Recipe');
const ValidationError = mongoose.Error.ValidationError;

const createRecipe = async (request) => {
    try {
        const recipe = new Recipe(request);
        return await recipe.save();
    } catch (e) {
        handleError(e);
    }
};

const listAll = async (query) => {
    try {
        return await Recipe.find(query).exec();
    } catch (e) {
        handleError(e);
    }
};

const update = async (id, updateRequest) => {
    try {
        return Recipe.findByIdAndUpdate(id, updateRequest, {new: true});
    } catch (e) {
        handleError(e);
    }
};

const getById = async (id) => {
    try {
        return Recipe.findById(id);
    } catch (e) {
        handleError(e);
    }
};


const handleError = (err) => {
    console.error(err.message);

    if (err instanceof ValidationError) {
        throw new HandledHttpError(400, err.message);
    } else {
        throw new HandledHttpError(500, err.message);
    }
};

module.exports = {
    createRecipe,
    getById,
    listAll,
    update
};
