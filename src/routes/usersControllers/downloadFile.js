import User from '../../models/userModel.js';

export async function downloadFile(req, res, next) {
  const { userId } = req.params;

  try {
    const { resumeFileName } = await User.findById(userId);
    if (!resumeFileName) {
      return res.status(401).json({ success: false, msg: 'File not found.' });
    } else {
      res.download(`./src/${resumeFileName}`);
    }
  } catch (error) {
    next(error);
  }
}
