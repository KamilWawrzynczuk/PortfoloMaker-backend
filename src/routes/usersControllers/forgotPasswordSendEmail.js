import { v4 as uuid } from 'uuid';
import { sendEmail } from '../../util/sendEmail.js';
import User from '../../models/userModel.js';

export async function forgotPasswordSendEmail(req, res, next) {
  const { email } = req.body;
  const passwordResetCode = uuid();


  const result = await User.findOneAndUpdate(
    { email },
    { $set: { passwordResetCode } }
  );
  
  if (result) {
    try {
      await sendEmail({
        to: email,
        from: 'kamil.wawrzynczuk@gmail.com',
        subject: 'Password Reset',
        text: `
                    To reset your password, click this link:
                    https://portfoliomaker.onrender.com/users/reset-password/${passwordResetCode}
                `,
      });
      return res.status(200).json({
        success: true,
        msg: 'Email with reset password link sent.',
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).json({ success: false, msg: 'Email is incorrect' });
  }
}

