import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  address: string;
}

const userSchema = new Schema({
  address: {
    type: String, required: true
  },
}, {
  timestamps: true,
});

const User = model<IUser>('User', userSchema);

export default User;
