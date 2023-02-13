import User from '../../models/userModel.js';

export async function verifyUserEmail(req, res, next) {
  try {
    const { verificationString } = req.body;

    const user = await User.findOne({ verificationString });

    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          msg: 'The email verification code is incorrect.',
        });
    }

    const { _id: id } = user;

    await User.findOneAndUpdate(
      { _id: id },
      { $set: { isVerified: true } },
      { $unset: { verificationString } }
    );
    res.status(200).json({success: true, msg: 'Email verified successfully.' });
  } catch (error) {
    next(error);
  }
}
