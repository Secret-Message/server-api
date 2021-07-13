
import { IChannel } from '../interfaces/IChannel';
import channels from '../models/ChannelModel';
import { CRUD } from './CommonService';

export default class ChannelService implements CRUD{
    
    public create(params: IChannel, callback: any) {
        const _session = new channels(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        channels.findOne(query, callback);
    }

    public update(params: IChannel, callback: any) {
        const query = { _id: params._id };
        channels.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        channels.deleteOne(query, callback);
    }

}