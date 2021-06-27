
import { IServer } from './model';
import servers from './schema';

export default class ServerService {
    
    public createServer(server_params: IServer, callback: any) {
        const _session = new servers(server_params);
        _session.save(callback);
    }

    public filterServer(query: any, callback: any) {
        servers.findOne(query, callback);
    }

    public updateServer(server_params: IServer, callback: any) {
        const query = { _id: server_params._id };
        servers.findOneAndUpdate(query, server_params, callback);
    }
    
    public deleteServer(_id: String, callback: any) {
        const query = { _id: _id };
        servers.deleteOne(query, callback);
    }

}