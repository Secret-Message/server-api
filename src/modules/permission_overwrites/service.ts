
import { IPermission_overwrite } from './model';
import permission_overwrites from './schema';

export default class PermissionOverwriteService {
    
    public createPermissionOverwrite(permission_overwrite_params: IPermission_overwrite, callback: any) {
        const _session = new permission_overwrites(permission_overwrite_params);
        _session.save(callback);
    }

    public filterPermissionOverwrite(query: any, callback: any) {
        permission_overwrites.findOne(query, callback);
    }

    public updatePermissionOverwrite(permission_overwrite_params: IPermission_overwrite, callback: any) {
        const query = { _id: permission_overwrite_params._id };
        permission_overwrites.findOneAndUpdate(query, permission_overwrite_params, callback);
    }
    
    public deletePermissionOverwrite(_id: String, callback: any) {
        const query = { _id: _id };
        permission_overwrites.deleteOne(query, callback);
    }

}