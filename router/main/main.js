const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  console.log('main page', req.user);
  const id = req.user;
  res.sendFile(path.join(__dirname, '../../public/main.html'));
  res.render('main.ejs', { id });
});

module.exports = router;
