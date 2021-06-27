import { IMember } from '../members/model';

export interface IMessage {
    _id?: String;
    author: IMember,
    content: String,
    Send_date: Date,
    parent_message?: IMessage
}