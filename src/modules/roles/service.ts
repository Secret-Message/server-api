
import { IRole } from './model';
import roles from './schema';

export default class RoleService {
    
    public createRole(role_params: IRole, callback: any) {
        const _session = new roles(role_params);
        _session.save(callback);
    }

    public filterRole(query: any, callback: any) {
        roles.findOne(query, callback);
    }

    public updateRole(role_params: IRole, callback: any) {
        const query = { _id: role_params._id };
        roles.findOneAndUpdate(query, role_params, callback);
    }
    
    public deleteRole(_id: String, callback: any) {
        const query = { _id: _id };
        roles.deleteOne(query, callback);
    }

}