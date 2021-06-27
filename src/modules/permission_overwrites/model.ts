import { IMember } from '../members/model';
import { IRole } from '../roles/model';

export interface IPermission_overwrite {
    _id?: String;
    member?: IMember;
    role?: IRole;
    allow: Number;
    deny: Number;
    Number: Number
}