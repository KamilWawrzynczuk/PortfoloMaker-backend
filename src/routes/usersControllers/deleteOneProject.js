import SingleProjectData from '../../models/projectsDataModel.js';

export const deleteOneProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const projectToDelete = await SingleProjectData.deleteOne({
      _id: projectId,
    });
    res.status(200).json({ success: true, msg: 'Project was delete.' });
  } catch (err) {
    next(err);
  }
};
