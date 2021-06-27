import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'members' },
    content: String,
    Send_date: Date,
    Parent_message: { type: Schema.Types.ObjectId, ref: 'messages' }
});

export default mongoose.model('messages', schema);