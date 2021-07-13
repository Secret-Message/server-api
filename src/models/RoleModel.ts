import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    server: { type: Schema.Types.ObjectId, ref: 'servers' },
    allow: Number,
    deny: Number,
    name: String,
    color: String,
    mentionable: Boolean,
    number: Number
});

export default mongoose.model('roles', schema);