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
  let msg;
  const erMsg = req.flash('error');
  if (erMsg) {
    msg = erMsg;
  }
  res.render('join.ejs', { message: msg });
});

passport.serializeUser((user, done) => {
  console.log('passport session save: ', user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('passport session get in: ', id);
  done(null, id);
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
      const query = connection.query(
        `SELECT * FROM user WHERE email=?`,
        [email],
        (err, rows) => {
          if (err) {
            return done(err);
          }
          if (rows.length) {
            console.log('existed user');
            return done(null, false, { message: 'your email is already used' });
          } else {
            const sql = { email: email, pw: password };
            const query = connection.query(
              `INSERT INTO user SET ?`,
              sql,
              (err, rows) => {
                if (err) {
                  throw err;
                }
                return done(null, { email: email, id: rows.insertId });
              }
            );
          }
        }
      );
    }
  )
);

router.post(
  '/',
  passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true,
  })
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
