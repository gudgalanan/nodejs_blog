const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Use `engine` from express-handlebars
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))

// HTTP logger
app.use(morgan('combined'));

// Template engine setup
app.engine('hbs', engine({
    extname: '.hbs'  // Use .hbs instead of .hbs
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
    res.render('home'); // Correct method to render a template
});

app.get('/news', (req, res) => {
    res.render('news'); // Correct method to render a template
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
