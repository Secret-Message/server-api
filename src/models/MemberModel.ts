import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    server: { type: Schema.Types.ObjectId, ref: 'servers' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    isOwner: Boolean
});

export default mongoose.model('members', schema);