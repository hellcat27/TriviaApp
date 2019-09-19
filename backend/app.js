const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;
const triviaRoutes = require('./routes/trivia.route');
const dataRoutes = require('./routes/data.route');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully.");
});
app.use(cors());
app.options('*', cors());
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
*/
app.use(bodyParser.json());

app.use('/api/trivia', triviaRoutes);
app.use('/api/data', dataRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});