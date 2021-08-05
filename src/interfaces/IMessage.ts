export interface IMessage {
    _id?: String;
    channel: String;
    author: String;
    content: String;
    sendDate?: Date;
    parentMessage?: String
}