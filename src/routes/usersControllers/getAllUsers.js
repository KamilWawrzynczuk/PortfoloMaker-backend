import User from '../../models/userModel.js';

export function getAllUsers(req, res, next) {
  User.find({})
    .then((users) => {
      if (!users) {
        return res
          .status(404)
          .json({ success: false, msg: 'Could not find any users' });
      } else {
        if (users.length === 0) {
          return res
            .status(200)
            .json({ success: true, msg: 'List of users is empty. ', users });
        } else {
          res
            .status(200)
            .json({ success: true, msg: 'List of all users: ', users });
        }
      }
    })
    .catch((err) => {
      next(err);
    });
}
