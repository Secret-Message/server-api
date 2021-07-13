import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    firebaseUid: String,
    frinedCode: Number,
    avataUrl: String,
    joinDate: { type: Date, default: Date.now },
    status: { type: String, default: "online" },
    customStatus: String
});

export default mongoose.model('users', schema);