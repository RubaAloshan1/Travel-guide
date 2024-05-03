const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Register
router.post('/register', (req, res) => {
  const { name, username, password } = req.body;

  User.register(new User({ name, username }), password, (err, user) => {
    if (err) {
      console.error(err);
      return res.render('register');
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
});

// Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true // Enable flash messages for error handling
//   })(req, res, next);

//   // Make sure to include this part
//   // res.render('login', { messages: req.flash('error') });
// });

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.render('login', { error: 'Invalid email or password' }); // Pass the error message directly to the view
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
