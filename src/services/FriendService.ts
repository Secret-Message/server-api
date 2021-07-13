
import { IFriend } from '../interfaces/IFriend';
import friends from '../models/FriendModel';
import { CRUD } from './CommonService';

export default class FriendService implements CRUD {
    
    public create(params: IFriend, callback: any) {
        const _session = new friends(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        friends.findOne(query, callback);
    }

    public getMany(query: any, callback: any) {
        friends.find(query, callback);
    }

    public update(params: IFriend, callback: any) {
        const query = { _id: params._id };
        friends.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        friends.deleteOne(query, callback);
    }

}