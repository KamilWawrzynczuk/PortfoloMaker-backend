import { model, Schema } from 'mongoose';
import User from './userModel.js';
const introSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  intro: {
    name: {
      type: String,
      default: 'John Doe',
    },
    greeting: {
      type: String,
      default: 'Hi, my name is',
    },
    header: {
      type: String,
      default: 'I am a Designer',
    },
    specialty: {
      type: String,
      default: `I am specializing in UX Design`,
    },
    current: {
      type: String,
      default: `Currently, i am searching for new challenges`,
    },
  },
});

const IntroData = model('Intro', introSchema);

export default IntroData;
