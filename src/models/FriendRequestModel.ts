import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'users' },
    receiver: { type: Schema.Types.ObjectId, ref: 'users' }
});

export default mongoose.model('friendRequests', schema);