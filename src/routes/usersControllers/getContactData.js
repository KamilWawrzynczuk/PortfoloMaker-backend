import User from '../../models/userModel.js';
import ContactData from '../../models/contactModel.js';

export function getContactData(req, res, next) {
  const { userId } = req.body;

  ContactData.find({ userId })
    .then((userData) => {
      if (!userData) {
        return res
          .status(404)
          .json({ success: false, msg: 'Could not find user data with id.' });
      }

      res.status(200).json({
        success: true,
        msg: 'User Data: ',
        userDataFromDb: {
          contact: userData[0].contact,
          contactInfo: userData[0].contactInfo,
        },
      });
    })
    .catch((err) => {
      next(err);
    });
}
