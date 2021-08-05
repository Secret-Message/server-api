import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    channel: { type: Schema.Types.ObjectId, ref: 'channels' },
    author: { type: Schema.Types.ObjectId, ref: 'members' },
    content: String,
    sendDate: { type: Date, default: Date.now },
    parentMessage: { type: Schema.Types.ObjectId, ref: 'messages' }
});

export default mongoose.model('messages', schema);