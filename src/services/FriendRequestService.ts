
import { IFriendRequest } from '../interfaces/IFriendRequest';
import friendRequests from '../models/FriendRequestModel';
import { CRUD } from './CommonService';

export default class FriendRequestService implements CRUD{
    
    public create(parmas: IFriendRequest, callback: any) {
        const _session = new friendRequests(parmas);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        friendRequests.findOne(query, callback);
    }

    public update(parmas: IFriendRequest, callback: any) {
        const query = { _id: parmas._id };
        friendRequests.findOneAndUpdate(query, parmas, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        friendRequests.deleteOne(query, callback);
    }

}