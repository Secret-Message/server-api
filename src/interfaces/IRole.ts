export interface IRole {
    _id?: String;
    server: String,
    allow: Number,
    deny: Number,
    name: String,
    color: String,
    mentionable: Boolean,
    number: Number
}