import { IMember } from '../interfaces/IMember';
import members from '../models/MemberModel';
import { CRUD } from './CommonService';

export default class MemberService implements CRUD {
    
    public create(params: IMember, callback: any) {
        const _session = new members(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        members.findOne(query, callback);
    }

    public getMany(query: any, callback: any) {
        members.find(query, callback);
    }

    public update(params: IMember, callback: any) {
        const query = { _id: params._id };
        members.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        members.deleteOne(query, callback);
    }

}