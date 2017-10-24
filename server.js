const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require('express-handlebars');

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');

app.use('/', routes);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

