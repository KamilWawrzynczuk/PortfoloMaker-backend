import passport from 'passport';

export async function logoutUser(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ success: true, msg: 'You are logged out.' });
  });
}
