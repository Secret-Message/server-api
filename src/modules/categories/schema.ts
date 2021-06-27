import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    channels: [ { type: Schema.Types.ObjectId, ref: 'channels' } ],
    permission_overwrites: [ { type: Schema.Types.ObjectId, ref: 'permission_overwrites' } ],
    number: Number
});

export default mongoose.model('categories', schema);