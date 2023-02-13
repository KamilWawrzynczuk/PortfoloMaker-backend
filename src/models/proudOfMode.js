import { model, Schema } from 'mongoose';
import User from './userModel.js';

const proudOfSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  proudOf: {
    type: String,
    default: `Projects I'm proud of`,
  },
});

const ProudOfData = model('Proud', proudOfSchema);

export default ProudOfData;
