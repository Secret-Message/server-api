import { IRole } from '../interfaces/IRole';
import roles from '../models/RoleModel';
import { CRUD } from './CommonService';

export default class RoleService implements CRUD {
    
    public create(params: IRole, callback: any) {
        const _session = new roles(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        roles.findOne(query, callback);
    }

    public update(params: IRole, callback: any) {
        const query = { _id: params._id };
        roles.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        roles.deleteOne(query, callback);
    }

}