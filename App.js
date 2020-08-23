const express = require('express');
const app = express();
app.listen(3000, () => {
  console.log('start server');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});
