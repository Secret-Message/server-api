import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    permanent: Boolean,
    timeout: Date
});

export default mongoose.model('invites', schema);