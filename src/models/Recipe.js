const mongoose = require('mongoose');

const {Schema} = mongoose;


const Ingredient = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        min: 1
    },
    unit: {
        type: String,
        enum: ['pcs', 'tbsp', 'g', 'ml', 'cup', 'pinch'],
        required: true
    }
});

const Step = new Schema({
    text: {
        type: String
    }
});


const Recipe = new Schema({
    title: {
        type: String,
        required: true
    },
    categories: [String],
    author: {
        name: {
            type: String,
            required: true
        }

    },
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
        validate: {
            validator: (v) => v % 0.5 === 0,
            message: 'Difficulty must be an increment of 0.5'
        }
    },
    prepareTimeMinutes: {
        type: Number,
        min: 0,
        required: true
    },
    servings: {
        type: Number,
        min: 0,
        default: 1
    },

    ingredients: [Ingredient],
    instruction: [Step],


    vegetarian: {
        type: Boolean,
        default: false
    },
    vegan: {
        type: Boolean,
        default: false
    },
    glutenFree: {
        type: Boolean,
        default: false
    },
    lowFodmap: {
        type: Boolean,
        default: false
    },
    dairyFree: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        min: 0,
        default: 0
    },
});

Recipe.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
});

mongoose.model('Recipe', Recipe);
