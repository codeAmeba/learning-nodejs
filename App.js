const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.listen(3000, () => {
  console.log('start server');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/main', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

app.post('/email_post', (req, res) => {
  console.log(req.body.email);
  // res.send('<h1>Welcome ' + req.body.email + '</h1>');
  res.render('email.ejs', { email: req.body.email });
});
