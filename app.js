const createError = require('http-errors');
const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db.js');
const guiRouter = require('./gui');
const apiRouter = require('./api');
const app = express();

// Session configuration
const session = {
  secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
  resave : false,
  saveUninitialized: false
};

// Passport configuration
const strategy = new LocalStrategy(
  async (username, password, done) => {
    if (!await db.user.exists({username: username})) {
      // no such user
      return done(null, false, {message: 'Wrong username'});
    }
    if (!await db.user.validate({username: username, password: password})) {
      // invalid password
      // should disable logins after N messages
      // delay return to rate-limit brute-force attacks
      await new Promise((r) => setTimeout(r, 2000)); // two second delay
      return done(null, false, {message: 'Wrong password'});
    }
    // success!
    // should create a user object here, associated with a unique identifier
    return done(null, await db.user.read({username: username}));
  });

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser(async (user, done) => {
  done(null, (await db.user.read(user)).id);
});

// Convert a unique identifier to a user object.
passport.deserializeUser(async (uid, done) => {
  done(null, (await db.user.read({id: uid})));
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', guiRouter);
app.use('/api', apiRouter);
app.post('/login', passport.authenticate('local' , {
  'successRedirect': '/',
  'failureRedirect': '/login'
}));

app.post('/register', async function(req, res, next) {
  if (await db.user.exists({username: req.body.username})) {
    res.redirect('/register');
  } else {
    db.user.create({
      username: req.body.username, 
      password: req.body.password
    });
    res.redirect('/login');
  }
});

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
  req.logout(); // Logs us out!
  res.redirect('/login'); // back to login
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.sendFile('error.html', {root : __dirname + '/html/'});
});

module.exports = app;
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})