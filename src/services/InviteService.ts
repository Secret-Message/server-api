import { IInvite } from '../interfaces/IInvite';
import invites from '../models/InviteModel';
import { CRUD } from './CommonService';

export default class InviteService implements CRUD{
    
    public create(params: IInvite, callback: any) {
        const _session = new invites(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        invites.findOne(query, callback);
    }

    public update(params: IInvite, callback: any) {
        const query = { _id: params._id };
        invites.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        invites.deleteOne(query, callback);
    }

}