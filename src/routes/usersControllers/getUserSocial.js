import User from '../../models/userModel.js';

export function getUserSocial(req, res, next) {
  const { userId } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ success: false, msg: 'User does not exist.' });
      }

      res.status(200).json({
        success: true,
        msg: 'Matching User: ',
        social: {
          github: user.github,
          linkedIn: user.linkedIn,
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          websiteTitle: user.websiteTitle,
        },
      });
    })
    .catch((err) => {
      next(err);
    });
}
