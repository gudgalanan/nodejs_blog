const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Use `engine` from express-handlebars
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override')


//Connect to db
db.connect();

app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine setup
app.engine(
    'hbs',
    engine({
        extname: '.hbs', // Use .hbs instead of .hbs
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
