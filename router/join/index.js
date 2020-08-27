const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const password = 'tndud1454!';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: password,
  database: 'nodejs',
});

connection.connect();

router.get('/', (req, res) => {
  console.log('get join url');
  res.render('join.ejs');
});

passport.use(
  'local-join',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      console.log('local-join callback called');
    }
  )
);

// router.post('/', (req, res) => {
//   const body = req.body;
//   const email = body.email;
//   const name = body.name;
//   const password = body.password;
//   const sql = { email, name, pw: password };

//   const query = connection.query('INSERT INTO user SET ?', sql, (err, rows) => {
//     if (err) {
//       throw err;
//     } else {
//       res.render('welcome.ejs', { name: name, id: rows.insertId });
//     }
//   });
// });

module.exports = router;
