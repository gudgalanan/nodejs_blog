const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Use `engine` from express-handlebars
const app = express();
const port = 3000;
const route = require('./routes')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

// HTTP logger
app.use(morgan('combined'));

// Template engine setup
app.engine('hbs', engine({
    extname: '.hbs'  // Use .hbs instead of .hbs
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
