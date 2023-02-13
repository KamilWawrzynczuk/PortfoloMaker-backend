import User from '../../models/userModel.js';
import IntroData from '../../models/introDataModel.js';

export function getUserData(req, res, next) {
  const { userId } = req.body;

  IntroData.find({ userId })
    .then((userData) => {
      if (!userData) {
        return res
          .status(404)
          .json({ success: false, msg: 'Could not find user data with id.' });
      }

      res.status(200).json({
        success: true,
        msg: 'User Data: ',
        userDataFromDb: userData[0].intro,

      });
    })
    .catch((err) => {
      next(err);
    });
}
