import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    isOwner: Boolean,
    User: { type: Schema.Types.ObjectId, ref: 'users' },
    Roles: [ { type: Schema.Types.ObjectId, ref: 'roles' } ]
});

export default mongoose.model('members', schema);