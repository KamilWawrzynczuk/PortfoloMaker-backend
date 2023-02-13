import { Router } from 'express';
import passport from 'passport';


export const facebookRoute = Router();

facebookRoute.get('/', passport.authenticate('facebook'), function (req, res) {
  res.status(200).json({ success: true, msg: 'You are log in with facebook.' });
});

facebookRoute.get(
  '/secret',
  passport.authenticate('facebook', { failureRedirect: '/users/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    //Take us to our page
    res.status(200).json({
      success: true,
      msg: 'You are log in protected rout with facebook.',
    });
  }
);

