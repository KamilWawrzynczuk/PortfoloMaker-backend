import User from '../../models/userModel.js';

export function getOneUser(req, res, next) {
  const { user_id } = req.params;
  User.findById(user_id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ success: false, msg: 'User does not exist.' });
      }
      res.status(200).json({
        success: true,
        msg: 'Matching User: ',
        user: {
          fName: user.fName,
        },
      });
    })
    .catch((err) => {
      next(err);
    });
}
