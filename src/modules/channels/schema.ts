import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    voice: Boolean,
    messages: [ { type: Schema.Types.ObjectId, ref: 'messages' } ],
    permission_overwrites: [ { type: Schema.Types.ObjectId, ref: 'permission_overwrites' } ],
    number: Number
});

export default mongoose.model('channels', schema);