const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const config = require('config');
const CORS = require('cors')
const app = express();
app.use(CORS())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./route/user'))
app.use('/api/todo', require('./route/toDos'))

const PORT = config.get('port') || '5000';

(async () => {
    try {
        await mongoose.connect(config.get('dataBase'),  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        } )
        app.listen("5000", () => console.log(`Server up on ${PORT} port`))
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
})()

