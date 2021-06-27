
import { IChannel } from './model';
import channels from './schema';

export default class ChannelService {
    
    public createChannel(channel_params: IChannel, callback: any) {
        const _session = new channels(channel_params);
        _session.save(callback);
    }

    public filterChannel(query: any, callback: any) {
        channels.findOne(query, callback);
    }

    public updateChannel(channel_params: IChannel, callback: any) {
        const query = { _id: channel_params._id };
        channels.findOneAndUpdate(query, channel_params, callback);
    }
    
    public deleteChannel(_id: String, callback: any) {
        const query = { _id: _id };
        channels.deleteOne(query, callback);
    }

}