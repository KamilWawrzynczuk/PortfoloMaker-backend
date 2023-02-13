import { model, Schema } from 'mongoose';
import User from './userModel.js';

const contactSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  contact: {
    type: String,
    default: 'Contact me',
  },
  contactInfo: {
    type: String,
    default: `I'm always interested in hearing about new teaching opportunities, writing curricula, or instructional design work.`,
  },
});

const ContactData = model('Contact', contactSchema);

export default ContactData;
