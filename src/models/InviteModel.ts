import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    server: { type: Schema.Types.ObjectId, ref: 'servers' },
    permanent: Boolean,
    timeout: Date,
    inviteCode: String
});

export default mongoose.model('invites', schema);