import { IPermission_overwrite } from "../permission_overwrites/model";
import { IChannel } from "../channels/model";

export interface ICategory {
    _id?: String;
    name: String;
    channels: IChannel[];
    permission_overwrites: IPermission_overwrite[];
    number: Number
}