import User from '../../models/userModel.js';

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.deleteOne({ _id: id });
    res
      .status(200)
      .json({ success: true, msg: 'User was delete.', user: userToDelete });
  } catch (err) {
    next(err);
  }
};
