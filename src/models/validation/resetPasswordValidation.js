import { body } from 'express-validator';

export const resetPasswordValidationMiddleware = [
  body(
    'newPassword',
    'Password needs to be at least 6 characters long and contains a number and a special character.'
  )
    .isLength({ min: 6 })
    .custom(async (password) => {
      var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!regularExpression.test(password)) {
        return Promise.reject(
          'Password needs to be at least 6 characters long and contains at least one number and at least one special character.'
        );
      }
    }),
];
