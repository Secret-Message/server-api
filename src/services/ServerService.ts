import { IServer } from '../interfaces/IServer';
import servers from '../models/ServerModel';
import { CRUD } from './CommonService';

export default class ServerService implements CRUD{
    
    public create(params: IServer, callback: any) {
        const _session = new servers(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        servers.findOne(query, callback);
    }

    public getMany(query: any, callback: any) {
        servers.find(query, callback);
    }

    public update(params: IServer, callback: any) {
        const query = { _id: params._id };
        servers.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        servers.deleteOne(query, callback);
    }

}