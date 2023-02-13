import User from '../../models/userModel.js';
import SingleProjectData from '../../models/projectsDataModel.js';

import { handleUpload } from '../usersRoute.js';

export const addUserImage = async (req, res, next) => {
  const { projectId, userId } = req.params;

  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    const responseFromCloudinary = await handleUpload(dataURI);

    const { _id } = await User.findById(userId);

    const updateProject = await SingleProjectData.find({
      userId: _id,
    }).findOneAndUpdate(
      { _id: projectId },
      {
        $set: {
          'projects.image': responseFromCloudinary.url,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      msg: 'Project image updated.',
      userData: {
        projectId: updateProject._id,
        ...updateProject.projects,
      },
    });
  } catch (error) {
    next(error)
  }
};
