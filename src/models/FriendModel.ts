import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    you: { type: Schema.Types.ObjectId, ref: 'users' },
    friend: { type: Schema.Types.ObjectId, ref: 'users' }
});

export default mongoose.model('friends', schema);