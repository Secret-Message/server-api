import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    server: { type: Schema.Types.ObjectId, ref: 'servers' },
    name: String,
    number: { type: Number, default: 0 }
});

export default mongoose.model('categories', schema);