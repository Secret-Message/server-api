
import { IBan } from '../interfaces/IBan';
import bans from '../models/BanModel';
import { CRUD } from './CommonService';

export default class BanService implements CRUD {
    
    public create(params: IBan, callback: any) {
        const _session = new bans(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        bans.findOne(query, callback);
    }

    public update(params: IBan, callback: any) {
        const query = { _id: params._id };
        bans.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        bans.deleteOne(query, callback);
    }

}