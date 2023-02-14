import User from '../../models/userModel.js';
import IntroData from '../../models/introDataModel.js';
import ProudOfData from '../../models/proudOfMode.js';
import SingleProjectData from '../../models/projectsDataModel.js';
import ContactData from '../../models/contactModel.js';

export async function FinalPage(req, res, next) {
  
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    const introData = await IntroData.find({ userId: userId });
    const proudOfData = await ProudOfData.find({ userId: userId });
    const projectsData = await SingleProjectData.find({ userId: userId });
    const contactData = await ContactData.find({ userId: userId });

    res.status(200).json({
      success: true,
      msg: 'All user data',
      userData: {
        user: {
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          github: user.github,
          linkedIn: user.linkedIn,
          websiteTitle: user.websiteTitle,
        },
        introData,
        proudOfData,
        projectsData,
        contactData,
      },
    });
  } catch (error) {
    next(error);
  }
}
