import { model, Schema } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import IntroData from './introDataModel.js';

const userSchema = new Schema({
  fName: {
    type: String,
    require: [true, 'First name is required.'],
  },
  lName: {
    type: String,
    require: [true, 'Last name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'This email is already in use.'],
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, 'Password is required.'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationString: {
    type: String,
    default: null,
  },
  passwordResetCode: {
    type: String,
    default: null,
  },
  introData: {
    type: Schema.Types.ObjectId,
    ref: 'Intro',
  },
  github: {
    type: String,
    default: 'www.github.com',
  },
  linkedIn: {
    type: String,
    default: 'www.linkedin.com',
  },
  websiteTitle: {
    type: String,
    default: 'Portfolio Creator',
  },
  resumeFileName: {
    type: String,
    default: null,
  },
  changeAt: {
    type: Date,
  },
  hash: String,
  salt: String,
});

userSchema.plugin(findOrCreate);

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email is already in use.'));
  } else {
    next(error);
  }
});

const User = model('User', userSchema);

export default User;
