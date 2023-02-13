import User from '../../models/userModel.js';

export const updateUser = async (req, res, next) => {
  try {
    const { userId, github, linkedIn, websiteTitle } = req.body;

    const substringGithubIndex = github.toLowerCase().indexOf('github');
    const githubLink = github.substring(substringGithubIndex);

    const substringLinkedInIndex = linkedIn.toLowerCase().indexOf('linkedin');
    const linkedInLink = linkedIn.substring(substringLinkedInIndex);

    const userToUpdate = await User.findByIdAndUpdate(
      userId,
      {
        github: githubLink,
        linkedIn: linkedInLink,
        websiteTitle: websiteTitle,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: 'Updated successfully',
      social: {
        github: userToUpdate.github,
        linkedIn: userToUpdate.linkedIn,
        websiteTitle: userToUpdate.websiteTitle,
      },
    });
  } catch (err) {
    next(err);
  }
};
