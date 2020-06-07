const express = require('express');
const router = express.Router();
const {handleError} = require("../helpers/error");
const RecipeService = require('../services/RecipesService');


router.post('/', async (req, res, next) => {
    try {
        const response = await RecipeService.createRecipe(req.body);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const response = await RecipeService.listAll(req.query);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.get('/:recipeId', async (req, res, next) => {
    try {
        const {recipeId} = req.params;
        const response = await RecipeService.getById(recipeId);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.put('/:recipeId', async (req, res, next) => {
    try {
        const {recipeId} = req.params;
        const response = await RecipeService.update(recipeId, req.body);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = router;

