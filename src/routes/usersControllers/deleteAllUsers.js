import User from '../../models/userModel.js';

export const deleteAllUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUsers = await User.deleteMany({});

    if (deletedUsers.deletedCount === 0) {
      res.status(404).json({ success: false, msg: 'No users to delete.' });
    } else {
      res.status(200).json({ success: true, msg: 'All users deleted.' });
    }
  } catch (err) {
    next(err);
  }
};
