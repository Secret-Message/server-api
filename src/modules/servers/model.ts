import { IMember } from '../members/model';
import { IInvite } from '../invites/model';
import { IRole } from '../roles/model';
import { ICategory } from '../categories/model';
import { IBan } from '../bans/model';

export interface IServer {
    name: String,
    icon_url?: String,
    dm: Boolean,
    members?: IMember[],
    invites?: IInvite[],
    roles?: IRole[],
    categories?: ICategory[],
    bans?: IBan[]
}