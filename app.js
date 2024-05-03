const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');
const flash = require('connect-flash');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files
app.use(express.static(__dirname + '/public'));


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/eventsDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
