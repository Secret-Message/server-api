import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    firebase_uid: String,
    friend_code: Number,
    avatar_url: String,
    join_date: { type: Date, default: Date.now },
    status: { type: String, default: "online" },
    custom_status: String,
    friend_requests: [ { type: Schema.Types.ObjectId, ref: 'users' } ],
    friends: [ { type: Schema.Types.ObjectId, ref: 'users' } ]
});

export default mongoose.model('users', schema);