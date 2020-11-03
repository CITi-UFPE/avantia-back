import { Schema, model, Document } from 'mongoose';

export interface IMedia extends Document {
  userId: string;
  folderName: string;
}

const mediaSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, required: true,
  },
  folderName: {
    type: String, required: true,
  }
}, {
  timestamps: true,
});

const Media = model<IMedia>('Media', mediaSchema);

export default Media;
