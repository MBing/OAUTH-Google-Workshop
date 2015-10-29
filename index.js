'use strict'

var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var app = express();

app.use(session({ secret: 'LFKSJEFSLKJSEKLJDSFF' }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '995444688073-h0a1d2ero32n6smkf318q2kte9em4j8s.apps.googleusercontent.com',
  clientSecret: 'ucrQrHnxlZUhHF83Sk_6p1vd',
  callbackURL: 'http://127.0.0.1:8060/authenticate/callback'
}, function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}));

app.get('/', function(req, res) {
  res.send('<a href="/authenticate">Log in!</a>');
});

app.get('/authenticate', passport.authenticate('google', {
  scope: 'https://www.googleapis.com/auth/userinfo.profile'
}));

app.get('/authenticate/callback', passport.authenticate('google', {
  successRedirect: '/display',
  failureRedirect: '/'  
}));

app.get('/display', function(req, res) {
  if(!req.user) {
    return res.redirect('/authenticate');
  }

  res.send('Hello ' + req.user.displayName);
});


app.listen(8060);
