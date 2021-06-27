
import { IMessage } from './model';
import messages from './schema';

export default class MessageService {
    
    public createMessage(message_params: IMessage, callback: any) {
        const _session = new messages(message_params);
        _session.save(callback);
    }

    public filterMessage(query: any, callback: any) {
        messages.findOne(query, callback);
    }

    public updateMessage(message_params: IMessage, callback: any) {
        const query = { _id: message_params._id };
        messages.findOneAndUpdate(query, message_params, callback);
    }
    
    public deleteMessage(_id: String, callback: any) {
        const query = { _id: _id };
        messages.deleteOne(query, callback);
    }

}