import User from '../../models/userModel.js';
import { genPassword, issueJWT } from '../../utils.js';
import { validationResult } from 'express-validator';

export async function changePassword(req, res, next) {
  const { newPassword, confirmPassword, userId } = req.body;
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
      { _id: userId },
      {
        $set: { hash: newHash, salt: newSalt, changeAt: new Date() },
      }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        msg: 'Password change successfully',
      });
    } else {
      res
        .status(401)
        .json({ success: false, msg: 'Something is wrong. Please try again.' });
    }
  } catch (error) {
    next(error);
  }
}
