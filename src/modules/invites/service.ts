
import { IInvite } from './model';
import invites from './schema';

export default class InviteService {
    
    public createInvite(invite_params: IInvite, callback: any) {
        const _session = new invites(invite_params);
        _session.save(callback);
    }

    public filterInvite(query: any, callback: any) {
        invites.findOne(query, callback);
    }

    public updateInvite(invite_params: IInvite, callback: any) {
        const query = { _id: invite_params._id };
        invites.findOneAndUpdate(query, invite_params, callback);
    }
    
    public deleteInvite(_id: String, callback: any) {
        const query = { _id: _id };
        invites.deleteOne(query, callback);
    }

}