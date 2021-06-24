import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    icon_url: String,
    dm: Boolean,
    members: [ { type: Schema.Types.ObjectId, ref: 'members' } ],
    invites: [ { type: Schema.Types.ObjectId, ref: 'invites' } ],
    roles: [ { type: Schema.Types.ObjectId, ref: 'roles' } ],
    categories: [ { type: Schema.Types.ObjectId, ref: 'categories' } ],
    bans: [ { type: Schema.Types.ObjectId, ref: 'bans' } ]
});

export default mongoose.model('servers', schema);