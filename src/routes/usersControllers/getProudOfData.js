import User from '../../models/userModel.js';
import ProudOfData from '../../models/proudOfMode.js';

export function getProudOfData(req, res, next) {
  const { userId } = req.body;

  ProudOfData.find({ userId })
    .then((userData) => {
      if (!userData) {
        return res
          .status(404)
          .json({ success: false, msg: 'Could not find user data with id.' });
      }
  
      res.status(200).json({
        success: true,
        msg: 'User Data: ',
        userDataFromDb: userData[0].proudOf,
      });
    })
    .catch((err) => {
      next(err);
    });
}
