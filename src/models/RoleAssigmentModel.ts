import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'members' },
    role: { type: Schema.Types.ObjectId, ref: 'roles' }
});

export default mongoose.model('roleAssigments', schema);