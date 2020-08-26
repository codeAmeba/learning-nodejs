const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router/index');
const cors = require('cors');

app.listen(3000, () => {
  console.log('start server');
});

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(router);

app.get('/form.html', (req, res, next) => {
  res.json({ msg: 'this is CORS-enabled for all origins' });
});

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80');
});
