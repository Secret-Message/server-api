import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'members' },
    role: { type: Schema.Types.ObjectId, ref: 'roles' },
    allow: Number,
    deny: Number,
    Number: Number
});

export default mongoose.model('permission_overwrites', schema);