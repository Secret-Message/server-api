import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'categories' },
    name: String,
    voice: Boolean,
    number: { type: Number, default: 0 }
});

export default mongoose.model('channels', schema);