const express = require('express');
const app = express();
const router = express.Router();
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

router.post('/form', (req, res) => {
  console.log(req.body.email);
  res.render('email.ejs', { email: req.body.email });
});

router.post('/ajax', (req, res) => {
  const email = req.body.email;
  const responseData = {};

  const query = connection.query(
    `SELECT name FROM user WHERE email="${email}"`,
    (err, rows) => {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = 'ok';
        responseData.name = rows[0].name;
      } else {
        responseData.result = 'none';
        responseData.name = '';
      }
      res.json(responseData);
    }
  );
});

module.exports = router;
