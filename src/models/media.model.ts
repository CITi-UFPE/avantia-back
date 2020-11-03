import { Schema, model, Document } from 'mongoose';

export interface IMedia extends Document {
  userId: string;
  fileName: string;
  fileType: string;
}

const mediaSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, required: true,
  },
  fileName: {
    type: String, required: true,
  },
  fileType: {
    type: String, required: true,
  }
}, {
  timestamps: true,
});

const Media = model<IMedia>('Media', mediaSchema);

export default Media;
