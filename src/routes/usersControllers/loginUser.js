import User from '../../models/userModel.js';
import { validPassword, issueJWT } from '../../../utils.js';

export function loginUser(req, res, next) {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    return res
      .status(401)
      .json({ success: false, msg: 'Both fields required.' });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: 'Password or email are incorrect.' });
      }

      if (!user.isVerified) {
        return res
          .status(401)
          .json({ success: false, msg: 'Your email is not verified.' });
      }

      const isValid = validPassword(
        String(req.body.password),
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = issueJWT(user);

        return res.status(200).json({
          success: true,
          user_id: user._id,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        return res.status(401).json({
          success: false,
          msg: 'Password or email are incorrect.',
        });
      }
    })
    .catch((err) => next(err));
}
