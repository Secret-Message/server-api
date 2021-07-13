import { IMessage } from '../interfaces/IMessage';
import messages from '../models/MessageModel';
import { CRUD } from './CommonService';

export default class MessageService implements CRUD {
    
    public create(params: IMessage, callback: any) {
        const _session = new messages(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        messages.findOne(query, callback);
    }

    public update(params: IMessage, callback: any) {
        const query = { _id: params._id };
        messages.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        messages.deleteOne(query, callback);
    }

}