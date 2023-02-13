import User from '../../models/userModel.js';
import { sendEmail } from '../../util/sendEmail.js';
import { v4 as uuidv4 } from 'uuid';
import { genPassword, issueJWT } from '../../../utils.js';
import { validationResult } from 'express-validator';
import IntroData from '../../models/introDataModel.js';
import SingleProjectData from '../../models/projectsDataModel.js';
import ProudOfData from '../../models/proudOfMode.js';
import ContactData from '../../models/contactModel.js';

export async function registerUser(req, res, next) {
  const { password, confirmPassword } = req.body;
  const verificationString = uuidv4();
  const myValidationResults = validationResult(req);

  if (password !== confirmPassword) {
    return res
      .status(400)
      .send({
        success: false,
        errors: [{ msg: 'Passwords need to be the same.' }],
      });
  }

  if (myValidationResults.errors.length > 0) {
    return res.status(400).send({
      success: false,
      msg: 'Some data is invalid',
      errors: myValidationResults.array(),
    });
  }

  const saltHash = genPassword(password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    lName: req.body.lName,
    fName: req.body.fName,
    email: req.body.email,
    verificationString: verificationString,
    changeAt: new Date(),
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then(async (user) => {
      // new user need to verify email
      await sendEmail({
        to: req.body.email,
        from: 'kamil.wawrzynczuk@gmail.com',
        subject: 'Please verify your email',
        text: `
            Thanks for signing up! To verify your email, click here:
            http://localhost:5173/users/verify-email/${user.verificationString}
        `,
      });

      // create default data for new user
      const introData = await IntroData.create({
        userId: user._id,
      });

      const singleProject = await SingleProjectData.create({
        userId: user._id,
      });

      const proudOf = await ProudOfData.create({
        userId: user._id,
      });

      const contact = await ContactData.create({
        userId: user._id,
      });

      // create and send JWT token to user
      const jwt = issueJWT(user);
      res.status(200).json({
        success: true,
        user_id: user.id,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) => next(err));
}
