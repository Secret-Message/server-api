import { IRoleAssigment } from '../interfaces/IRoleAssigment';
import roleAssigments from '../models/RoleAssigmentModel';
import { CRUD } from './CommonService';

export default class RoleAssigmentServie implements CRUD {
    
    public create(params: IRoleAssigment, callback: any) {
        const _session = new roleAssigments(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        roleAssigments.findOne(query, callback);
    }

    public update(params: IRoleAssigment, callback: any) {
        const query = { _id: params._id };
        roleAssigments.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        roleAssigments.deleteOne(query, callback);
    }

}