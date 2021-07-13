import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    iconUrl: String,
    dm: Boolean
});

export default mongoose.model('servers', schema);