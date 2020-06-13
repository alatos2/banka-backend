import express from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import route from './routes/google_auth';

const app = express();

dotenv.config();

const { clientId, clientsecret, port } = process.env;

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
  keys: ['randomstringhere']
}));

app.use(passport.initialize());
app.use(passport.session());

// Strategy Config
passport.use(new GoogleStrategy({
  clientID: clientId,
  clientSecret: clientsecret,
  callbackURL: 'http://localhost:8000/api/v1/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  done(null, profile); // passes the profile data to serializeUser
}));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get('/', (req, res) => {
  res.render('../index.ejs');
});

app.use('/api/v1', route);

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
