import User from '../../models/userModel.js';
import IntroData from '../../models/introDataModel.js';
import ProudOfData from '../../models/proudOfMode.js';
import SingleProjectData from '../../models/projectsDataModel.js';
import ContactData from '../../models/contactModel.js';

export const deleteOneUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    await User.deleteOne({ _id: userId });
    await IntroData.deleteOne({ userId: userId });
    await ProudOfData.deleteOne({ userId: userId });
    await ContactData.deleteOne({ userId: userId });
    await SingleProjectData.deleteMany({ userId: userId });

    res.status(200).json({ success: true, msg: 'User deleted.' });
  } catch (err) {
    next(err);
  }
};
