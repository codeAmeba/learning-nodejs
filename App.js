const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const password = 'tndud1454!';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: password,
  database: 'nodejs',
});

connection.connect();

app.listen(3000, () => {
  console.log('start server');
});

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/form.html', (req, res, next) => {
  res.json({ msg: 'this is CORS-enabled for all origins' });
});

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80');
});

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

app.post('/ajax_send_email', (req, res) => {
  console.log(req.body.email);
  const responseData = { result: 'ok', email: req.body.email };
  res.json(responseData);
});
