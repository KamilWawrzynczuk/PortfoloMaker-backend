import User from '../../models/userModel.js';
import { genPassword, issueJWT } from '../../../utils.js';
import { validationResult } from 'express-validator';

export async function resetUserPassword(req, res, next) {
  const { passwordResetCode } = req.body;
  const { newPassword, confirmPassword } = req.body;
  const myValidationResults = validationResult(req);

  if (newPassword !== confirmPassword) {
    return res
      .status(401)
      .send({ success: false, errors: 'Passwords need to be the same.' });
  }

  if (myValidationResults.errors.length > 0) {
    return res.status(400).send({
      success: false,
      msg: myValidationResults.array()[0].msg,
      errors: myValidationResults.array()[0].msg,
    });
  }
  try {
    const saltHash = genPassword(String(newPassword));
    const newSalt = saltHash.salt;
    const newHash = saltHash.hash;

    const result = await User.findOneAndUpdate(
      { passwordResetCode },
      {
        $set: { hash: newHash, salt: newSalt, changeAt: new Date() },
        $unset: { passwordResetCode },
      }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        msg: 'Password reset successfully.',
      });
    } else {
      res.status(401).json({ success: false, msg: 'Reset code is invalid.' });
    }
  } catch (error) {
    next(error);
  }
}
