import User from '../../models/userModel.js';
import ProudOfData from '../../models/proudOfMode.js';

export const addProudOf = async (req, res, next) => {
  const { data, userId } = req.body;

  try {
    const { _id } = await User.findById(userId);
    const proudOfData = await ProudOfData.findOneAndUpdate(
      { userId: _id },
      {
        $set: {
          proudOf: data,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: 'proudOf data updated.',
      proudOfData: proudOfData.proudOf,
    });
  } catch (err) {
    next(err);
  }
};
