import express from 'express';
import passport from 'passport';
import authentication from '../middlewares/auth';

const route = express.Router();

// passport.authenticate middleware is used here to authenticate the request
route.get('/auth/google', passport.authenticate('google', {
  scope: ['profile'] // Used to specify the required data
}));

// The middleware receives the data from Google and runs the function on Strategy config
route.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/api/v1/secret');
});

// Secret route
route.get('/secret', authentication.isUserAuthenticatedViaGoogle, (req, res) => {
  res.send('You have reached the secret route');
});

// Logout route
route.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default route;
