const express = require('express');
const hbs = require('express-handlebars');
const app = express();

app.use(express.static('public'));

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/',
}));
app.set('view engine', 'hbs');


app.get('/EN', function (req, res) {
  res.render("skyscrpr.hbs", {});
})

app.get('/FR', function (req, res) {
  res.render("skyscrprFR.hbs", {});
})

app.get('/*', function (req, res) {
  res.render("skyscrprFR.hbs", {});
})


app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
})
