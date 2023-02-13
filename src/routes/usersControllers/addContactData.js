import User from '../../models/userModel.js';
import ContactData from '../../models/contactModel.js';

export const addContactData = async (req, res, next) => {
  const { data, userId } = req.body;

  try {
    const { _id } = await User.findById(userId);
    const contactData = await ContactData.findOneAndUpdate(
      { userId: _id },
      {
        $set: {
          contact: data.contact,
          contactInfo: data.contactInfo,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: 'contact data updated.',
      contactData: {
        contact: contactData.contact,
        contactInfo: contactData.contactInfo,
      },
    });
  } catch (err) {
    next(err);
  }
};
