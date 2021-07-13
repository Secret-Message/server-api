import { IUser } from '../interfaces/IUser';
import users from '../models/UserModel';
import { CRUD } from './CommonService';

export default class UserService implements CRUD {
    
    public create(params: IUser, callback: any) {
        const _session = new users(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        users.findOne(query, callback);
    }

    public getMany(query: any, callback: any) {
        users.find(query, callback);
    }

    public update(params: IUser, callback: any) {
        const query = { _id: params._id };
        users.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }

}