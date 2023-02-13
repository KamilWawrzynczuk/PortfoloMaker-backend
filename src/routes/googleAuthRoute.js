import { Router } from 'express';
import passport from 'passport';

export const googleRoute = Router();

googleRoute.get('/', passport.authenticate('google', { scope: ['profile'] }, function (req, res) {
  console.log('w google route')
  res.status(200).json({ success: true, msg: 'You are log in with google' });
}));

googleRoute.get('/secrets', passport.authenticate('google', { failureRedirect: '/users/login' }),
function (req, res) {
  res
    .status(200)
    .json({ success: true, msg: 'You are i protected route with google.' });
})

