import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    allow: Number,
    deny: Number,
    color: String,
    mentionable: Boolean,
    Number: Number
});

export default mongoose.model('roles', schema);