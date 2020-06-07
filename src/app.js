const express = require('express');
const logger = require('morgan');
require('dotenv-flow').config();
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 8080;

const indexRouter = require('./routes/index');
const recipesRouter = require('./routes/recipes');

const app = express();

app.use(logger('combined'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/recipes', recipesRouter);


app.options('*', cors());
app.use(cors());


const connectToDatabase = () => {
    return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
};

const listen = () => {
    if (app.get('env') === 'test') return;
    app.listen(PORT, () => {
        console.log(`Recipes app listening on port ${PORT}!`);
    });
};

mongoose.connection
    .on('error', console.log)
    .on('disconnected', connectToDatabase)
    .once('open', listen);


connectToDatabase();


