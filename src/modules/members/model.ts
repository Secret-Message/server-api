import { IUser } from '../users/model';
import { IRole } from '../roles/model';

export interface IMember {
    _id?: String;
    isOwner: Boolean,
    user: IUser
    roles?: IRole[]
}