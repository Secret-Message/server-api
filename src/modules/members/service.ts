
import { IMember } from './model';
import members from './schema';

export default class MemberService {
    
    public createMember(member_params: IMember, callback: any) {
        const _session = new members(member_params);
        _session.save(callback);
    }

    public filterMember(query: any, callback: any) {
        members.findOne(query, callback);
    }

    public updateMember(member_params: IMember, callback: any) {
        const query = { _id: member_params._id };
        members.findOneAndUpdate(query, member_params, callback);
    }
    
    public deleteMember(_id: String, callback: any) {
        const query = { _id: _id };
        members.deleteOne(query, callback);
    }

}