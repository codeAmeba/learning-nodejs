const express = require('express');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

app.listen(3000, () => {
  console.log('start server');
});

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.json({ msg: 'this is CORS-enabled for all origins' });
});

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80');
});

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

app.post('/ajax_send_keyword', (req, res) => {
  console.log(req.body.text);
  const responseData = { result: 'ok', text: req.body.text };
  res.json(responseData);
});
