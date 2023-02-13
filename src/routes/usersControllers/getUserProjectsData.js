import User from '../../models/userModel.js';
import SingleProjectData from '../../models/projectsDataModel.js';

export function getUserProjectsData(req, res, next) {
  const { user_id } = req.body;

  SingleProjectData.find({ userId: user_id })
    .then((userData) => {
      if (!userData) {
        return res
          .status(404)
          .json({ success: false, msg: 'Could not find user data with id.' });
      }
      res.status(200).json({
        success: true,
        msg: 'User Project Data: ',
        projects: userData.map((project) => {
          return {
            projectId: project._id,
            subtitle: project.projects.subtitle,
            title: project.projects.title,
            description: project.projects.description,
            secondSubtitle: project.projects.secondSubtitle,
            list: project.projects.list,
            image: project.projects.image,
            linkToWebsite: project.projects.linkToWebsite,
            linkValue: project.projects.linkValue,
          };
        }),
      });
    })
    .catch((err) => {
      next(err);
    });
}
