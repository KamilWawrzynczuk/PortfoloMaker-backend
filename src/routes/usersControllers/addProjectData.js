import User from '../../models/userModel.js';
import SingleProjectData from '../../models/projectsDataModel.js';

export const addProjectData = async (req, res, next) => {
  const { data, userId, projectId } = req.body;

  try {
    const { _id } = await User.findById(userId);
    let newProject;
    let updateProject;
    if (projectId === undefined) {
      newProject = await SingleProjectData.create({
        userId: _id,
      });
      return res.status(200).json({
        success: true,
        msg: 'Project data updated.',
        userData: {
          projectId: newProject._id,
          ...newProject.projects,
        },
      });
    } else {
      let index;
      let substring;
      if (data.linkToWebsite.includes('https://')) {
        index = data.linkToWebsite.toLowerCase().indexOf('https://');
        substring = data.linkToWebsite.substring(index + 8);
      } else if (data.linkToWebsite.includes('http://')) {
        index = data.linkToWebsite.toLowerCase().indexOf('http://');
        substring = data.linkToWebsite.substring(index + 7);
      } else if (data.linkToWebsite.includes('www')) {
        index = data.linkToWebsite.toLowerCase().indexOf('www');
        substring = data.linkToWebsite.substring(index);
      } else {
        substring = data.linkToWebsite;
      }

      updateProject = await SingleProjectData.find({
        userId: _id,
      }).findOneAndUpdate(
        { _id: projectId },
        {
          $set: {
            projects: {
              subtitle: data.subtitle,
              title: data.title,
              description: data.description,
              secondSubtitle: data.secondSubtitle,
              list: data.list,
              image: data.image,
              linkToWebsite: substring,
              linkValue: data.linkValue,
            },
          },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        msg: 'Project data updated.',
        userData: {
          projectId,
          ...updateProject.projects,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
