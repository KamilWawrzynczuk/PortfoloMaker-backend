import User from '../../models/userModel.js';

export async function uploadFile(req, res, next) {
  const { userId } = req.params;
  const { filename } = req.file;

  User.findByIdAndUpdate(userId, {
    resumeFileName: filename,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ success: false, msg: 'Upload failed.' });
      } else {

        return res
          .status(200)
          .json({ success: true, msg: 'Resume upload successfully' });
      }
    })
    .catch((error) => {
      next(error);
    });
}
